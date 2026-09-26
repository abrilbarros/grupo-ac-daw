import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Reserva } from "../entities/turnos.entity.js";
import { Repository } from "typeorm";
import { CreateReservaDto } from "../dtos/input/create-reserva.dto.js";
import { EstadosReserva } from "../enums/estados-reserva.enum.js";

@Injectable()
export class TurnosService{

    constructor(@InjectRepository(Reserva)private readonly repository: Repository<Reserva>){}

    async crearReserva(dto: CreateReservaDto): Promise<{id: number}>{
        const reserva: Reserva = this.repository.create(dto);
        reserva.estado = EstadosReserva.ACTIVO;

        await this.repository.save(reserva);

        return {id: reserva.id}
    }
}