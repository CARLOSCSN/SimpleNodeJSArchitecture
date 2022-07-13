import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { AnswerSheetService } from './answer-sheet.service';
import { CreateAnswerSheetDto } from './dto/create-answer-sheet.dto';
import { UpdateAnswerSheetDto } from './dto/update-answer-sheet.dto';
import { ExportToCsv } from 'export-to-csv';
import { Response as ExpressResponse } from 'express';
import { AnswerSheetFilter } from './dto/answer-sheet-filter.dto';

@Controller('answer-sheet')
export class AnswerSheetController {
  constructor(private readonly answerSheetService: AnswerSheetService) {}

  @Post()
  create(@Body() createAnswerSheetDto: CreateAnswerSheetDto) {
    return this.answerSheetService.create(createAnswerSheetDto);
  }

  @Post('upload')
  @UseInterceptors(AnyFilesInterceptor())
  async uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    if (files == undefined) {
      console.log('no files uploaded...');
      return null;
    }

    const contentFile = files[0].buffer.toString();
    const items = await this.answerSheetService.prepareAnswerSheet(contentFile);

    return Promise.all([items])
      .then(async (res) => {
        return await this.answerSheetService.createAll(res[0]);
      })
      .catch((err) => console.log('Catch', err));
  }

  @Get()
  findAll() {
    return this.answerSheetService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.answerSheetService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateAnswerSheetDto: UpdateAnswerSheetDto,
  ) {
    return this.answerSheetService.update(+id, updateAnswerSheetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.answerSheetService.remove(+id);
  }

  @Post('findByFilter')
  findByFilter(@Body() filter: AnswerSheetFilter) {
    return this.answerSheetService.findByFilter(filter);
  }

  @Post('export-csv')
  async export(@Body() filter: AnswerSheetFilter, @Res() res: ExpressResponse) {
    if (!filter.examId || !filter.candidateEmail) {
      throw new NotFoundException(
        "To generate an exam result it is necessary to search for the exam id and the candidate's email",
      );
    }

    const data = await this.answerSheetService.findByFilter(filter);

    if (data.length == 0) {
      throw new NotFoundException('Data not found!');
    }

    const result = await this.answerSheetService.prepareExamResult(
      data[0].examId,
      data[0].candidateEmail,
      data[0].candidateName,
    );

    await Promise.all([data, result]).then(async (x) => {
      const options = {
        fieldSeparator: '|',
        quoteStrings: '',
        decimalSeparator: '.',
        showLabels: false,
        showTitle: false,
        useTextFile: false,
        useBom: true,
        useKeysAsHeaders: true,
      };

      if (x[1].length == 0) {
        throw new NotFoundException('Data not found!');
      }

      const csvExporter = new ExportToCsv(options);
      let csvData = csvExporter.generateCsv(x[1], true);
      csvData = csvData.replace(
        'examId|averageScore|candidateEmail|candidateName|score|percentRank',
        'Exam Id|Average Score|Candidate Email|Candidate Name|Score|Percent Rank',
      );
      res.header('Content-Type', 'text/csv');
      res.attachment('exam-results.csv');
      return res.send(csvData);
    });
  }
}
