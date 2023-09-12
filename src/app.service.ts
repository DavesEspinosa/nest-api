import { Injectable } from '@nestjs/common';
import { data } from './data';
import { ReportInterface, ReportTypeEnum } from './Schemas/Report';
import { v4 as uuid } from 'uuid';
import { CreateReport } from './Schemas/CreateReport';

@Injectable()
export class AppService {
  getAllReports(type: string): Array<ReportInterface> {
    const reportTypeEnum =
      type === 'income' ? ReportTypeEnum.INCOME : ReportTypeEnum.EXPENSE;
    return data.report.filter((report) => report.type === reportTypeEnum);
  }

  getIncomeReportById({
    id,
    type,
  }: {
    id: string;
    type: string;
  }): ReportInterface {
    const reportTypeEnum =
      type === 'income' ? ReportTypeEnum.INCOME : ReportTypeEnum.EXPENSE;
    return data.report
      .filter((report) => report.type === reportTypeEnum)
      .find((report) => report.id === id) as ReportInterface;
  }
  createReport({
    body,
    type,
  }: {
    body: CreateReport;
    type: string;
  }): ReportInterface {
    const newReport: ReportInterface = {
      id: uuid(),
      created_at: new Date(),
      updated_at: new Date(),
      type: type === 'income' ? ReportTypeEnum.INCOME : ReportTypeEnum.EXPENSE,
      ...body,
    };

    data.report.push(newReport);
    return newReport;
  }

  updateReport({
    body,
    type,
    id,
  }: {
    body: CreateReport;
    type: string;
    id: string;
  }): ReportInterface | undefined {
    const reportTypeEnum =
      type === 'income' ? ReportTypeEnum.INCOME : ReportTypeEnum.EXPENSE;
    const selectedReport = data.report
      .filter((report) => report.type === reportTypeEnum)
      .find((report) => report.id === id);

    if (!selectedReport) return;

    const reportIndex = data.report.findIndex(
      (report) => report.id === selectedReport.id,
    );
    data.report[reportIndex] = {
      ...data.report[reportIndex],
      ...body,
    };
    return data.report[reportIndex];
  }

  deleteReport(id: string) {
    const reportIndex = data.report.findIndex((report) => report.id === id);
    if (reportIndex === -1) return;
    data.report.splice(reportIndex, 1);
  }
}
