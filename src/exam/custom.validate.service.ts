import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ExamService } from './exam.service';

@ValidatorConstraint({ name: 'ExamExists', async: true })
@Injectable()
export class ExamExistsRule implements ValidatorConstraintInterface {
  constructor(private readonly examService: ExamService) {}

  public async validate(examIdParam: string) {
    return await this.examService.isExistsByExamId(examIdParam);
  }

  public defaultMessage(args: ValidationArguments) {
    return `Register doesn't exist`;
  }
}

export function ExamExists(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'ExamExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: ExamExistsRule,
    });
  };
}
