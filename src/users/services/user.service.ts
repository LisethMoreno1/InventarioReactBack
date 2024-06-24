// user.service.ts
import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { RolesService } from '../../rol/services/roles.service';
import { CreateUserDto } from '../Dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { TypeOfIdentificationService } from '../../type-of-identification/service/typeOfIdentification.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>, // Repositorio para gestionar las operaciones de usuario
    private readonly rolesService: RolesService, // Servicio para gestionar roles
    private readonly typeOfIdentificationService: TypeOfIdentificationService, // Servicio para gestionar tipos de identificación
  ) {}

  // Crear un nuevo usuario
  async createUser(userData: CreateUserDto): Promise<User> {
    // Validar que se proporcione un ID de tipo de identificación
    if (!userData.typeOfIdentificationId) {
      throw new BadRequestException('typeOfIdentificationId es obligatorio');
    }

    // Buscar el rol por ID
    const role = await this.rolesService.findRoleById(userData.roleId);
    if (!role) {
      throw new NotFoundException(`Role with ID ${userData.roleId} not found`);
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

    // Verificar si el usuario ya existe por email y numerio de identificacion
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
    const hashedPassword = await bcrypt.hash(userData.password, 10); // 10 es el número de saltos

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

  // Almacenar  y actualizat token del ususario
  async updateAccessToken(id: number, accessToken: string): Promise<void> {
    const user = await this.userRepo.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    user.accessToken = accessToken;
    await this.userRepo.save(user);
  }

  // Encontrar un usuario por su ID
  async findOne(id: number): Promise<User | undefined> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  // Encontrar todos los usuarios
  async findAll(): Promise<User[]> {
    return await this.userRepo.find();
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
