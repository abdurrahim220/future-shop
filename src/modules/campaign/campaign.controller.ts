import { HTTP_STATUS } from "../../errors/httpStatus";
import asyncHandler from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import CampaignService from "./campaign.services";
import { Request, Response } from "express";

class CampaignController {
  constructor(private campaignService: CampaignService) {}

  createCampaign = asyncHandler(async (req: Request, res: Response) => {
    const newData = req.body;
    const result = await this.campaignService.createCampaign(newData);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Campaign created successfully",
      data: result,
    });
  });

  getAllCampaigns = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.campaignService.findAllCampaigns();
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Campaigns fetched successfully",
      data: result,
    });
  });

  getCampaignById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.campaignService.findCampaignById(id as string);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Campaign fetched successfully",
      data: result,
    });
  });

  updateCampaign = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.campaignService.updateCampaign(id as string, req.body);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Campaign updated successfully",
      data: result,
    });
  });

  deleteCampaign = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.campaignService.deleteCampaign(id as string);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Campaign deleted successfully",
      data: result,
    });
  });
}

export default CampaignController;