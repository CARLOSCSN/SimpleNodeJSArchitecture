import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { Exam } from './entities/exam.entity';

@Injectable()
export class ExamService implements OnModuleInit {
  constructor(@InjectRepository(Exam) private model: Repository<Exam>) {}

  async onModuleInit() {
    //console.log('onModuleInit ExamService')
  }

  public async create(createAnswerSheetDto: CreateExamDto): Promise<Exam> {
    return await this.model.save(createAnswerSheetDto);
  }

  public async findAll() {
    return await this.model.find();
  }

  public async findOne(id: number): Promise<Exam> {
    const result = await this.model.findOne({ where: { id } });

    if (!result) {
      throw new NotFoundException('Not Found');
    }

    return result;
  }

  public async findByExamId(examIdParam: string): Promise<Exam> {
    const result = await this.model.findOne({ where: { examId: examIdParam } });

    if (!result) {
      throw new NotFoundException('Not Found');
    }

    return result;
  }

  public async isExistsByExamId(examIdParam: string): Promise<boolean> {
    const result = await this.model.findOne({ where: { examId: examIdParam } });
    return result != null && result.id > 0;
  }

  public async update(id: number, updateExamDto: UpdateExamDto): Promise<Exam> {
    const result = await this.model.findOne({ where: { id } });

    if (!result) {
      throw new NotFoundException('Not Found');
    }

    await this.model.update({ id }, updateExamDto);

    return await this.model.findOne({ where: { id } });
  }

  public async remove(id: number): Promise<string> {
    const result = await this.model.findOne({ where: { id } });

    if (!result) {
      throw new NotFoundException('Not Found');
    }

    await this.model.delete(id);

    return `The record with Id ${id} was deleted successfully`;
  }

  public async createAll(
    arrayExamDto: Array<CreateExamDto>,
  ): Promise<Array<Exam>> {
    const result = new Array<Exam>();
    const list = await this.model.find();

    for (const item of arrayExamDto) {
      const errors = await validate(item);
      const existsExam = list.map((x) => x.examId == item.examId).length > 0;

      if (errors.length == 0 && !existsExam) {
        result.push(await this.model.save(item));
      }
    }

    return result;
  }

  public async removeAll(): Promise<string> {
    const result = await this.model.find();

    if (result.length > 0) {
      await this.model.delete(result.map((a) => a.id));
    }

    return `Records have been successfully deleted`;
  }
}
