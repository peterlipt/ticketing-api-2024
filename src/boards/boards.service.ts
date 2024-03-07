import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class BoardsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: Prisma.BoardCreateManyInput): Promise<Board> {
    return await this.prisma.board.create({ data: data });
  }

  async findAll(): Promise<Board[]> {
    return await this.prisma.board.findMany();
  }

  async findOne(id: number): Promise<Board> {
    const board = await this.prisma.board.findUnique({ where: { id: id } });
    if (board == null) {
      throw new NotFoundException('Board not found');
    }
    return board;
  }

  async update(id: number, data: Prisma.BoardUpdateInput): Promise<Board> {
    return await this.prisma.board.update({ where: { id }, data });
  }

  async remove(id: number): Promise<Board> {
    return await this.prisma.board.delete({ where: { id } });
  }
}
