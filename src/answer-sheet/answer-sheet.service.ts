import { ExamResults } from './dto/exam-results.dto';
import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { AnswerSheetFilter } from './dto/answer-sheet-filter.dto';
import { CreateAnswerSheetDto } from './dto/create-answer-sheet.dto';
import { UpdateAnswerSheetDto } from './dto/update-answer-sheet.dto';
import { AnswerSheet } from './entities/answer-sheet.entity';
import { ExamService } from 'src/exam/exam.service';
import { CreateExamDto } from 'src/exam/dto/create-exam.dto';

@Injectable()
export class AnswerSheetService implements OnModuleInit {
  constructor(
    @InjectRepository(AnswerSheet) private model: Repository<AnswerSheet>,
    private examServices: ExamService,
  ) {}

  async onModuleInit() {
    console.log('Seeder');

    const EX202001 = {
      examId: 'EX202001',
      questionNumber: 10,
      questions: [
        {
          question: 1,
          answer: 'A',
        },
        {
          question: 2,
          answer: 'C',
        },
        {
          question: 3,
          answer: 'C',
        },
        {
          question: 4,
          answer: 'A',
        },
        {
          question: 5,
          answer: 'B',
        },
        {
          question: 6,
          answer: 'B',
        },
        {
          question: 7,
          answer: 'C',
        },
        {
          question: 8,
          answer: 'A',
        },
        {
          question: 9,
          answer: 'D',
        },
        {
          question: 10,
          answer: 'A',
        },
      ],
    };

    const EX202002 = {
      examId: 'EX202002',
      questionNumber: 17,
      questions: [
        {
          question: 1,
          answer: 'B',
        },
        {
          question: 2,
          answer: 'D',
        },
        {
          question: 3,
          answer: 'C',
        },
        {
          question: 4,
          answer: 'C',
        },
        {
          question: 5,
          answer: 'A',
        },
        {
          question: 6,
          answer: 'D',
        },
        {
          question: 7,
          answer: 'E',
        },
        {
          question: 8,
          answer: 'E',
        },
        {
          question: 9,
          answer: 'C',
        },
        {
          question: 10,
          answer: 'A',
        },
        {
          question: 11,
          answer: 'E',
        },
        {
          question: 12,
          answer: 'C',
        },
        {
          question: 13,
          answer: 'D',
        },
        {
          question: 14,
          answer: 'E',
        },
        {
          question: 15,
          answer: 'A',
        },
        {
          question: 16,
          answer: 'B',
        },
        {
          question: 17,
          answer: 'D',
        },
      ],
    };

    const EX202003 = {
      examId: 'EX202003',
      questionNumber: 20,
      questions: [
        {
          question: 1,
          answer: 'B',
        },
        {
          question: 2,
          answer: 'C',
        },
        {
          question: 3,
          answer: 'E',
        },
        {
          question: 4,
          answer: 'E',
        },
        {
          question: 5,
          answer: 'A',
        },
        {
          question: 6,
          answer: 'C',
        },
        {
          question: 7,
          answer: 'D',
        },
        {
          question: 8,
          answer: 'E',
        },
        {
          question: 9,
          answer: 'A',
        },
        {
          question: 10,
          answer: 'A',
        },
        {
          question: 11,
          answer: 'E',
        },
        {
          question: 12,
          answer: 'C',
        },
        {
          question: 13,
          answer: 'B',
        },
        {
          question: 14,
          answer: 'A',
        },
        {
          question: 15,
          answer: 'B',
        },
        {
          question: 16,
          answer: 'C',
        },
        {
          question: 17,
          answer: 'A',
        },
        {
          question: 18,
          answer: 'B',
        },
        {
          question: 19,
          answer: 'B',
        },
        {
          question: 20,
          answer: 'D',
        },
      ],
    };

    const EX202004 = {
      examId: 'EX202004',
      questionNumber: 12,
      questions: [
        {
          question: 1,
          answer: 'E',
        },
        {
          question: 2,
          answer: 'A',
        },
        {
          question: 3,
          answer: 'C',
        },
        {
          question: 4,
          answer: 'D',
        },
        {
          question: 5,
          answer: 'E',
        },
        {
          question: 6,
          answer: 'A',
        },
        {
          question: 7,
          answer: 'A',
        },
        {
          question: 8,
          answer: 'E',
        },
        {
          question: 9,
          answer: 'C',
        },
        {
          question: 10,
          answer: 'B',
        },
        {
          question: 11,
          answer: 'A',
        },
        {
          question: 12,
          answer: 'B',
        },
      ],
    };

    const ex202001: CreateExamDto = Object.assign(
      new CreateExamDto(),
      JSON.parse(JSON.stringify(EX202001)),
    );

    const ex202002: CreateExamDto = Object.assign(
      new CreateExamDto(),
      JSON.parse(JSON.stringify(EX202002)),
    );

    const ex202003: CreateExamDto = Object.assign(
      new CreateExamDto(),
      JSON.parse(JSON.stringify(EX202003)),
    );

    const ex202004: CreateExamDto = Object.assign(
      new CreateExamDto(),
      JSON.parse(JSON.stringify(EX202004)),
    );

    const exams = new Array<CreateExamDto>();
    exams.push(ex202001);
    exams.push(ex202002);
    exams.push(ex202003);
    exams.push(ex202004);

    Promise.all([this.examServices.removeAll()])
      .then(async () => {
        return await this.examServices.createAll(exams);
      })
      .catch((err) => console.log('Catch', err));
  }

  public async create(
    createAnswerSheetDto: CreateAnswerSheetDto,
  ): Promise<AnswerSheet> {
    return await this.model.save(createAnswerSheetDto);
  }

  public async findAll() {
    return await this.model.find();
  }

  public async findOne(id: number): Promise<AnswerSheet> {
    const result = await this.model.findOne({ where: { id } });

    if (!result) {
      throw new NotFoundException('Not Found');
    }

    return result;
  }

  public async findByFilter(filter: AnswerSheetFilter): Promise<AnswerSheet[]> {
    const query = this.model.createQueryBuilder('answer_sheet');

    if (filter.examId) {
      query.andWhere('answer_sheet.examId = :examId', {
        examId: filter.examId,
      });
    }

    if (filter.candidateEmail) {
      query.andWhere('answer_sheet.candidateEmail = :candidateEmail', {
        candidateEmail: filter.candidateEmail,
      });
    }

    const result = await query.getMany();

    if (!result) {
      throw new NotFoundException('Not Found');
    }

    return result;
  }

  public async update(
    id: number,
    updateAnswerSheetDto: UpdateAnswerSheetDto,
  ): Promise<AnswerSheet> {
    const result = await this.model.findOne({ where: { id } });

    if (!result) {
      throw new NotFoundException('Not Found');
    }

    await this.model.update({ id }, updateAnswerSheetDto);

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
    arrayAnswerSheetDto: Array<CreateAnswerSheetDto>,
  ): Promise<Array<AnswerSheet>> {
    const result = new Array<AnswerSheet>();
    const list = await this.model.find();

    for (const item of arrayAnswerSheetDto) {
      const errors = await validate(item);
      const existAnswerSheet =
        list.map(
          (x) =>
            x.examId == item.examId && x.candidateEmail == item.candidateEmail,
        ).length > 0;

      if (errors.length == 0 && !existAnswerSheet) {
        result.push(await this.model.save(item));
      }
    }

    return result;
  }

  public async prepareAnswerSheet(
    contentFile: string,
  ): Promise<Array<CreateAnswerSheetDto>> {
    const listAnswerSheet = new Array<CreateAnswerSheetDto>();
    if (!contentFile) {
      return listAnswerSheet;
    }

    const rows = contentFile.split('\n');

    rows.forEach(async (row) => {
      if (row.includes('Exam Id')) {
        return;
      }

      const itemAnswerSheet = new CreateAnswerSheetDto();
      const collums = row.split('|');

      collums.forEach(async (collum, idxCollum) => {
        idxCollum = idxCollum + 1;

        switch (idxCollum) {
          case 1:
            itemAnswerSheet.examId = collum;
            break;
          case 2:
            itemAnswerSheet.examDate = collum;
            break;
          case 3:
            itemAnswerSheet.candidateEmail = collum;
            break;
          case 4:
            itemAnswerSheet.candidateName = collum;
            break;
          case 5:
            itemAnswerSheet.questionNumber = parseInt(collum);
            break;
          case 6:
            itemAnswerSheet.answer = collum.replace('\r', '');
            break;
          default:
            break;
        }
      });

      listAnswerSheet.push(itemAnswerSheet);
    });

    return listAnswerSheet;
  }

  public async getCandidatePercentRank(examId: string, candidateEmail: string) {
    const filter = new AnswerSheetFilter();
    filter.examId = examId;
    const answers = await this.findByFilter(filter);

    const candidates = answers
      .map((y) => y.candidateEmail)
      .filter((value, index, self) => self.indexOf(value) === index);

    const dta = await this.getCandidateDataProcess(examId, candidateEmail);
    const note = !dta ? 0 : dta.note;

    const arrayNotes = [];
    for (const email of candidates) {
      if (email != candidateEmail) {
        const rst = await this.getCandidateDataProcess(examId, email);
        const noteTemp = !rst ? 0 : rst.note;

        if (noteTemp < note) {
          arrayNotes.push(!rst ? 0 : rst.note);
        }
      }
    }

    const qtda = (arrayNotes.length / candidates.length) * 100;
    return (Math.round(qtda * 100) / 100).toFixed(2);
  }

  public async getCandidateDataProcess(examId: string, candidateEmail: string) {
    const filter = new AnswerSheetFilter();
    filter.examId = examId;
    filter.candidateEmail = candidateEmail;
    const answers = this.findByFilter(filter);
    const exam = this.examServices.findByExamId(examId);
    let note = 0;
    let questionNumber = 0;

    return Promise.all([answers, exam])
      .then(async (res) => {
        if (res[0].length == 0 || !res[1]) {
          throw new NotFoundException('Not Found');
        }

        questionNumber = res[1].questionNumber;

        for (const answer of res[0]) {
          const questionExam = res[1].questions.filter(
            (x) => x.question == answer.questionNumber,
          )[0];

          if (answer.answer && answer.answer === questionExam.answer) {
            note = note + 1;
          }
        }
      })
      .then(() => {
        return {
          note: parseFloat(note.toFixed(2)),
          score: this.getCandidatePercentHits(note, questionNumber),
        };
      })
      .catch((err) => console.log('Catch', err));
  }

  public getCandidatePercentHits(note, questionNumber) {
    const hits = (note / questionNumber) * 100;
    return (Math.round(hits * 100) / 100).toFixed(2);
  }

  public async getAverageScoreByExam(examId: string) {
    const filter = new AnswerSheetFilter();
    filter.examId = examId;
    const answers = await this.findByFilter(filter);
    let averageScore = 0;

    const candidates = answers
      .map((y) => y.candidateEmail)
      .filter((value, index, self) => self.indexOf(value) === index);

    for (const email of candidates) {
      const rst = await this.getCandidateDataProcess(examId, email);
      const note = !rst ? 0 : rst.note;
      averageScore = averageScore + note;
    }

    averageScore = (averageScore / candidates.length) * 100;
    return (Math.round(averageScore) / 100).toFixed(2);
  }

  public async prepareExamResult(
    examId: string,
    candidateEmail: string,
    candidateName: string,
  ): Promise<ExamResults[]> {
    const result = new ExamResults();
    const resultArray = new Array<ExamResults>();

    let averageScore = await this.getAverageScoreByExam(examId);
    averageScore = !averageScore ? '0' : averageScore;

    const x = await this.getCandidateDataProcess(examId, candidateEmail);
    const score = !x ? '0' : x.score;

    const percentRank = await this.getCandidatePercentRank(
      examId,
      candidateEmail,
    );

    result.examId = examId;
    result.averageScore = averageScore;
    result.candidateEmail = candidateEmail;
    result.candidateName = candidateName;
    result.score = score + '%';
    result.percentRank = percentRank + '%';

    resultArray.push(result);
    return resultArray;
  }
}
