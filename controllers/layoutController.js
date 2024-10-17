import layoutModel from "./../models/layoutModel.js";
import cloudinary from "cloudinary";

export const createLayout = async (req, res) => {
  try {
    const { type } = req.body;
    const typeExist = await layoutModel.findOne({ type });

    if (typeExist) {
      return res.status(400).send({
        success: false,
        message: `Layout ${type} already exist`,
      });
    }
    if (type === "Banner") {
      const { image, title, subtitle } = req.body;
      const myCloud = await cloudinary.v2.uploader.upload(image, {
        folder: "layout",
      });
      const banner = {
        type: "Banner",
        banner: {
          image: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          },
          title,
          subtitle,
        },
      };
      await layoutModel.create(banner);
    }

    if (type === "FAQ") {
      const { faq } = req.body;
      const faqItems = await Promise.all(
        faq.map(async (item) => {
          return {
            question: item.question,
            answer: item.answer,
          };
        })
      );
      await layoutModel.create({ type: "FAQ", faq: faqItems });
    }

    if (type === "Categories") {
      const { categories } = req.body;
      const categoriesItems = await Promise.all(
        categories.map(async (item) => {
          return {
            title: item.title,
          };
        })
      );
      await layoutModel.create({
        type: "Categories",
        categories: categoriesItems,
      });
    }

    return res.status(200).send({
      success: true,
      message: "Layout create Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};
