import cloudinary from "cloudinary";
import { createCourse } from "../services/courseService.js";
import coursesModel from "../models/courseModel.js";
// upload course
export const uploadCourse = async (req, res) => {
  try {
    const data = req.body;
    const thumbnail = data.thumbnail;

    if (thumbnail) {
      const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
        folder: "courses",
      });

      data.thumbnail = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }
    createCourse(data, res);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// edit course
export const updateCourse = async (req, res) => {
  try {
    const data = req.body;
    const thumbnail = data.thumbnail;
    const courseId = req.params.id;
    console.log(req.body, data.thumbnail);
    const course = await coursesModel.findById(courseId);

    if (!course) {
      return res.status(404).send({
        success: false,
        message: "Course not found",
      });
    }

    if (thumbnail) {
      await cloudinary.v2.uploader.destroy(thumbnail.public_id);

      const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
        folder: "courses",
      });

      data.thumbnail = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }
    // if (thumbnail.startsWith("https")) {
    //   data.thumbnail = {
    //     public_id: course.thumbnail.public_id,
    //     url: course.thumbnail.url,
    //   };
    // }
    const courseData = await coursesModel.findByIdAndUpdate(
      courseId,
      {
        $set: data,
      },
      { new: true }
    );

    return res.status(200).send({
      success: true,
      message: "Updated Course Successfully",
      course: courseData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// get single course
export const getSingleCourse = async (req, res) => {
  try {
    const courseId = req.params.id;

    const course = await coursesModel
      .findById(courseId)
      .select(
        "-courseData.videoUrl -courseData.suggestion -courseData.questions -course.links"
      );

    if (!course) {
      return res.status(404).send({
        success: false,
        message: "Course Not Found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Course Found",
      course: course,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// get all course
export const getAllCourse = async (req, res) => {
  try {
    const course = await coursesModel
      .find()
      .select(
        "-courseData.videoUrl -courseData.suggestion -courseData.questions -course.links"
      );

    if (!course) {
      return res.status(404).send({
        success: false,
        message: "Course Not Found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Course Found",
      course: course,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getCourseByUser = async (req, res) => {
  try {
    const userCourseList = req.user?.courses;
    const courseId = req.params.id;

    // the course exists in the user's course list
    console.log(userCourseList);
    const courseExists = userCourseList?.find(
      (course) => course._id.toString() === courseId
    );

    if (!courseExists) {
      return res.status(404).send({
        success: false,
        message: "You are not eligible to access this course",
      });
    }

    const course = await coursesModel.findById(courseId);
    const content = course?.courseData;

    res.status(200).send({
      success: true,
      message: "Course Found",
      content: content,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};
