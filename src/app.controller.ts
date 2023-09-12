import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  HttpCode,
  ParseUUIDPipe,
  ParseEnumPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ReportDto, ReportTypeEnum } from './Schemas/Report';
import { CreateReportDto } from './Schemas/CreateReport';

@Controller('report/:type')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllIncomeReports(@Param('type') type: string): Array<ReportDto> {
    return this.appService.getAllReports(type);
  }
  @Get(':id')
  getIncomeReportById(
    @Param('type', new ParseEnumPipe(ReportTypeEnum)) type: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): ReportDto | undefined {
    return this.appService.getIncomeReportById({ id, type });
  }

  @Post()
  createReport(
    @Body() body: CreateReportDto,
    @Param('type', new ParseEnumPipe(ReportTypeEnum)) type: string,
  ): ReportDto {
    return this.appService.createReport({ body, type });
  }
  @Put(':id')
  updateReport(
    @Body() body: CreateReportDto,
    @Param('type', new ParseEnumPipe(ReportTypeEnum)) type: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): ReportDto | undefined {
    return this.appService.updateReport({ type, id, body });
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(@Param('id', ParseUUIDPipe) id: string): void {
    return this.appService.deleteReport(id);
  }
}
