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

// update layout
export const updateLayout = async (req, res) => {
  try {
    const { type } = req.body;

    if (type === "Banner") {
      const bannerData = await layoutModel.findOne({ type: "Banner" });
      const { image, title, subtitle } = req.body;

      const data = image.startsWith("https")
        ? bannerData
        : await cloudinary.v2.uploader.upload(image, {
            folder: "layout",
          });

      const banner = {
        type: "Banner",
        image: {
          public_id: image.startsWith("https")
            ? bannerData.banner.image.public_id
            : data?.public_id,
          url: image.startsWith("https")
            ? bannerData.banner.image.url
            : data?.secure_url,
        },
        title,
        subtitle,
      };
      
      await layoutModel.findByIdAndUpdate(bannerData._id, { banner });
    }

    if (type === "FAQ") {
      const { faq } = req.body;
      const faqData = await layoutModel.findOne({ type: "FAQ" });
      const faqItems = await Promise.all(
        faq.map(async (item) => {
          return {
            question: item.question,
            answer: item.answer,
          };
        })
      );
      await layoutModel.findByIdAndUpdate(faqData._id, {
        type: "FAQ",
        faq: faqItems,
      });
    }

    if (type === "Categories") {
      const { categories } = req.body;
      const categoryData = await layoutModel.findOne({ type: "Categories" });
      const categoriesItems = await Promise.all(
        categories.map(async (item) => {
          return {
            title: item.title,
          };
        })
      );
      await layoutModel.findByIdAndUpdate(categoryData._id, {
        type: "Categories",
        categories: categoriesItems,
      });
    }

    return res.status(200).send({
      success: true,
      message: "Layout updated Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// get layout
export const getLayoutByType = async (req, res) => {
  try {
    const { type } = req.params;
    const layout = await layoutModel.findOne({ type });

    return res.status(200).send({
      success: true,
      message: "Get Layout Successfully",
      layout,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};
