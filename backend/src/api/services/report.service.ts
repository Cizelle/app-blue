import prisma from '../../utils/prisma';
import { hazard_reports, media_uploads } from '../../generated/prisma/client';
import { MediaData } from '../types';

type ReportData = Omit<
    hazard_reports,
    | 'report_id'
    | 'submission_time'
    | 'report_status'
    | 'validated_by'
    | 'validated_time'
>;

/**
 * Create a new hazard report with optional media attachments.
 */
export const createHazardReport = async (
    reportData: ReportData,
    mediaFiles: MediaData[] = [],
): Promise<hazard_reports> => {
    // 1) Create the report record
    const newReport = await prisma.hazard_reports.create({
        data: {
            user_id: reportData.user_id,
            event_type: reportData.event_type,
            report_category: reportData.report_category,
            description: reportData.description,
            latitude: reportData.latitude,
            longitude: reportData.longitude,
            location_description: reportData.location_description,
            source_type: reportData.source_type,
        },
    });

    // 2) Bulk-insert any media records
    if (mediaFiles.length > 0) {
        const mediaData = mediaFiles.map((m) => ({
            report_id: newReport.report_id,
            user_id: newReport.user_id,
            media_type: m.media_type,
            file_path: m.file_path,
        }));

        await prisma.media_uploads.createMany({
            data: mediaData,
        });
    }

    return newReport;
};

/**
 * Fetch all reports, optionally filtered.
 */
export const getAllReports = async (_filters: any): Promise<
    hazard_reports[]
> => {
    return prisma.hazard_reports.findMany({
        include: {
            media_uploads: true,
            users_hazard_reports_user_idTousers: {
                select: { name: true, profile_photo: true },
            },
        },
        orderBy: { submission_time: 'desc' },
    });
};

/**
 * Mark a report as validated by an official/analyst.
 */
export const validateReport = async (
    reportId: number,
    validatorId: number,
): Promise<hazard_reports> => {
    return prisma.hazard_reports.update({
        where: { report_id: reportId },
        data: {
            report_status: 'Validated',
            validated_by: validatorId,
            validated_time: new Date(),
        },
    });
};
