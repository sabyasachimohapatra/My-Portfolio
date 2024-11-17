import {catchAsyncErrors} from "../middlewares/catchAsyncErrors.js"
import ErrorHandler from "../middlewares/error.js"
import {Project} from "../models/projectSchema.js"
import { v2 as cloudinary } from "cloudinary";



export const addNewProject = catchAsyncErrors(async(req,res,next)=>{
    if(!req.files || Object.keys(req.files).length === 0) {
        return next(
          new ErrorHandler("Project Banner Image Required!", 404)
        );
      }
      const { projectBanner } = req.files;
      const { title, description, gitRepoLink, projectLink, technologies, stack, deployed } = req.body;
      if ( !title || !description || !gitRepoLink || !projectLink || !technologies || !stack || !deployed) {
        return next(new ErrorHandler("Please Fill Full Form!", 400));
      }
      const cloudinaryResponse = await cloudinary.uploader.upload(
        projectBanner.tempFilePath,
        { folder: "PORTFOLIO PROJECTS IMAGES" }
      );
      if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error(
          "Cloudinary Error:",
          cloudinaryResponse.error || "Unknown Cloudinary error"
        );
        return next(new ErrorHandler("Failed to upload Project Banner to Cloudinary", 500));
    }

    const project = await Project.create({title, description, gitRepoLink, projectLink, technologies, stack, deployed,
        projectBanner:{public_id:cloudinaryResponse.public_id,url:cloudinaryResponse.secure_url}});

        res.status(200).json({
            success: true,
            message: "New Project Added",
            project
        })
});


export const getSingleProject = catchAsyncErrors(async(req,res,next)=>{
    const { id } = req.params;
    let project = await Project.findById(id);
    if (!project) {
      return next(new ErrorHandler("Project Not Found", 404));
    }
    const projectImgId = project.projectBanner.public_id;
    await cloudinary.uploader.destroy(projectImgId);
    await project.deleteOne();
    res.status(200).json({
      success: true,
      project
    });
})


export const updateProject = catchAsyncErrors(async (req, res, next) => {
    const newProjectData = {
      title: req.body.title,
      description: req.body.description,
      stack: req.body.stack,
      technologies: req.body.technologies,
      deployed: req.body.deployed,
      projectLink: req.body.projectLink,
      gitRepoLink: req.body.gitRepoLink,
    };
    if (req.files && req.files.projectBanner) {
      const projectBanner = req.files.projectBanner;
      const project = await Project.findById(req.params.id);
      const projectImageId = project.projectBanner.public_id;
      await cloudinary.uploader.destroy(projectImageId);
      const newProjectImage = await cloudinary.uploader.upload(
        projectBanner.tempFilePath,
        {
          folder: "PORTFOLIO PROJECTS IMAGES" ,
        }
      );
      newProjectData.projectBanner = {
        public_id: newProjectImage.public_id,
        url: newProjectImage.secure_url,
      };
    }
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      newProjectData,
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
    res.status(200).json({
      success: true,
      message: "Project Updated!",
      project,
    });
  });

export const getAllProject = catchAsyncErrors(async(req,res,next)=>{
    const project = await Project.find();
    res.status(200).json({
      success: true,
      project,
    });
})


export const deleteProject = catchAsyncErrors(async(req,res,next)=>{
    const { id } = req.params;
    let project = await Project.findById(id);
    if (!project) {
      return next(new ErrorHandler("Project Not Found", 404));
    }
    const projectBannerId = project.projectBanner.public_id;
    await cloudinary.uploader.destroy(projectBannerId);
    await project.deleteOne();
    res.status(200).json({
      success: true,
      message: "Project Deleted!",
      project
    });
})