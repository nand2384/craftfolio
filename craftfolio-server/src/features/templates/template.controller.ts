import { Request, Response } from 'express';
import { getAllTemplates, getTemplateById, addTemplate } from './template.service.js';

export const getTemplates = async (req: Request, res: Response) => {
    try {
        const templates = await getAllTemplates(false);
        res.status(200).json({ success: true, count: templates.length, data: templates });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const getTemplateDetails = async (req: Request, res: Response) => {
    try {
        const { id } = req.params as { id: string };
        const template = await getTemplateById(id);
        
        if (!template) {
            return res.status(404).json({ success: false, error: "Template not found" });
        }
        
        res.status(200).json({ success: true, data: template });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const createTemplate = async (req: Request, res: Response) => {
    try {
        const newTemplate = await addTemplate(req.body);

        res.status(201).json({
            success: true,
            message: "Template created successfully",
            data: newTemplate
        });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
};
