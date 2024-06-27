import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../Dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { RolesService } from '../../Mantenimiento/rol/services/roles.service';
import { Role } from '../../Mantenimiento/rol/entities/Role.entity';
import { TypeOfIdentification } from '../../Mantenimiento/type-of-identification/entities/TypeOfIdentification.entity';
import { TypeOfIdentificationService } from '../../Mantenimiento/type-of-identification/service/typeOfIdentification.service';
import { typeOfGender } from '../../Mantenimiento/type-of-gender/entities/typeOfGender.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private readonly rolesService: RolesService,
    @InjectRepository(Role) private roleRepo: Repository<Role>,
    private readonly typeOfIdentificationService: TypeOfIdentificationService,
    @InjectRepository(TypeOfIdentification)
    private typeIdRepo: Repository<TypeOfIdentification>,
    @InjectRepository(typeOfGender)
    private typeOfGenderRepository: Repository<typeOfGender>,
  ) {}

  // Crear un nuevo usuario
  async createUser(userData: CreateUserDto): Promise<User> {
    // Validar que se proporcione un ID de tipo de identificación
    if (!userData.typeOfIdentificationId) {
      throw new BadRequestException('typeOfIdentificationId es obligatorio');
    }

    // Buscar el rol por ID
    const role = await this.rolesService.findRoleById(userData.typeOfRole);
    if (!role) {
      throw new NotFoundException(
        `Role with ID ${userData.typeOfRole} not found`,
      );
    }

    // Buscar el tipo de identificación por ID
    const typeOfIdentification =
      await this.typeOfIdentificationService.findById(
        userData.typeOfIdentificationId,
      );
    if (!typeOfIdentification) {
      throw new NotFoundException(
        `TypeOfIdentification with ID ${userData.typeOfIdentificationId} not found`,
      );
    }

    // Verificar si el usuario ya existe por  numerio de identificacion
    const existingUser = await this.userRepo.findOne({
      where: {
        identificationNumber: userData.identificationNumber,
      },
    });
    if (existingUser) {
      throw new ConflictException(
        `User with email ${userData.identificationNumber} already exists`,
      );
    }

    // Encriptar la contraseña antes de guardar el usuario
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Crear la entidad del nuevo usuario
    const newUser = this.userRepo.create({
      ...userData,
      role,
      typeOfIdentification,
      password: hashedPassword, // Guardar la contraseña encriptada
    });

    // Guardar el usuario en la base de datos y retornar la entidad guardada
    return this.userRepo.save(newUser);
  }

  // Validar si la contraseña ingresada es correcta

  async validatePassword(user: User, password: string): Promise<boolean> {
    if (!user || !password) {
      return false;
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    return passwordMatch;
  }

  // Encontrar un usuario por su número de identificación
  async findByIdentifier(
    identificationNumber: string,
  ): Promise<User | undefined> {
    return await this.userRepo.findOne({ where: { identificationNumber } });
  }

  // Almacenar  y actualiza token del usuario
  async updateAccessToken(id: number, accessToken: string): Promise<void> {
    const user = await this.userRepo.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    user.accessToken = accessToken;
    await this.userRepo.save(user);
  }

  // Encontrar un usuario por su ID
  async findOne(identificationNumber: number): Promise<User | undefined> {
    return await this.userRepo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .leftJoinAndSelect('user.genre', 'genre')
      .leftJoinAndSelect('user.typeOfIdentification', 'typeOfIdentification')
      .where('user.identificationNumber = :identificationNumber', {
        identificationNumber,
      })
      .getOne();
  }

  // Encontrar todos los usuarios
  async findAll(): Promise<User[]> {
    return await this.userRepo.find({
      relations: ['role', 'typeOfIdentification', 'genre'],
    });
  }

  // Actualizar un usuario existente
  async update(id: number, userData: Partial<User>): Promise<User | undefined> {
    const userToUpdate = await this.userRepo.findOne({ where: { id } });
    if (!userToUpdate) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Encriptar la contraseña si se proporciona una nueva
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }

    // Fusionar los nuevos datos en la entidad existente
    this.userRepo.merge(userToUpdate, userData);

    // Guardar el usuario actualizado en la base de datos
    return await this.userRepo.save(userToUpdate);
  }

  // Eliminar un usuario por su ID
  async delete(id: number): Promise<boolean> {
    const userToDelete = await this.userRepo.findOne({ where: { id } });
    if (!userToDelete) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Eliminar el usuario de la base de datos
    await this.userRepo.remove(userToDelete);
    return true;
  }
}
