const recipeSchema = require("../models/recipeSchema");
const cloudinary = require("../middlewares/cloudinary");

// test route
exports.test = (req, res) => {
    try {
      res.status(200).send("test ok");
    } catch (error) {
      res.status(400).send(error);
    }
};

exports.addRecipe = async (req, res) => {
  try {
      const result = await cloudinary.uploader.upload(req.file.path);

      let newRecipe = new recipeSchema({
          title: req.body.title,
          time: req.body.time,
          ingredients: req.body.ingredients,
          description: req.body.description,
          profile_img: result.secure_url,
          cloudinary_id: result.public_id,
          // addedBy: req.user._id
      });

      await newRecipe.save();
      res.status(200).send({ success: [{ msg: 'recipe added successfully' }], newRecipe });
  } catch (error) {
      console.error(error);
      res.status(400).send({ errors: [{ msg: 'error in adding new product' }], error });
  }
};

// get recipes
exports.getRecipes = async (req, res) => {
    try {
        const recipes = await recipeSchema.find();
        res.status(200).send(recipes);
    } catch (error) {
        res.status(400).send(error);
    }
  };

  //get recipe by id
exports.getById = async (req, res) => {
    try {
      const { _id } = req.params;
      let foundRecipe = await recipeSchema.findById({ _id });
      !foundRecipe
        ? res.status(400).send("recipe not found")
        : res.status(200).send(foundRecipe);
    } catch (error) {
      res.status(400).send(error);
    }
  };

  //delete recipe
exports.deleteRecipe = async (req, res) => {
    try {
      const {_id } = req.params;
      await recipeSchema.findByIdAndDelete({ _id })
      res.status(200).send({msg:'Recipe deleted successfully !'});
    } catch (error) {
      res.status(400).send(error);
    }
  };
  
//edit recipe
exports.editRecipe = async (req,res)=>{
  try {
      const {_id } = req.params;
      const { title, time, ingredients, description }=req.body
      await recipeSchema.findByIdAndUpdate({_id},{$set:{ title, time, ingredients, description}})
      res.status(200).send({msg:'Recipe updated successfully !'})
  } catch (error) {
      res.status(400).send({msg:'Something went wrong !',error});

  }
}

