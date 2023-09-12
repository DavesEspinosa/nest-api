import { generateMock } from '@anatine/zod-mock';
import { ReportSchema, ReportTypeEnum } from './Schemas/Report';

const reportMock = generateMock(ReportSchema);
const reportMock2 = generateMock(ReportSchema);
const reportMock3 = generateMock(ReportSchema);

export const data = {
  report: [
    { ...reportMock, id: 'uuid1', type: ReportTypeEnum.EXPENSE },
    { ...reportMock2, id: 'uuid2', type: ReportTypeEnum.INCOME },
    { ...reportMock3, id: 'uuid3', type: ReportTypeEnum.EXPENSE },
  ],
};
