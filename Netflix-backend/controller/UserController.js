const User = require("../models/UserModel");

module.exports.addToLikedMovies = async (req, res) => {
    try {
        const {email, body} = req.body;
        const user = await User.findOne({email});
        
        if(user) {
            const {likedMovies} = user;
            const movieAlreadyLiked = likedMovies.find(({id}) => id === data.id);
            
            if(!movieAlreadyLiked) {
                await User.findByIdAndUpdate(
                    user._id, 
                    {
                        likedMovies : [...user.likedMovies, data]
                    },
                    {
                        new:true
                    }
                );
            }
            else {
                return res.json({ msg : "Movie already added to liked list"})
            }
        }
        else {
            await User.create({ email, likedMovies: [data]});
        }
        
        return res.json({ msg: "Movie added successfully."});
    }
    catch(err) {
        res.json({error: err});
    }
};

module.exports.getLikedMovies = async (req, res) => {
    try {
      const { email } = req.params;
      const user = await await User.findOne({ email });
      if (user) {
        return res.json({ msg: "success", movies: user.likedMovies });
      } else return res.json({ msg: "User with given email not found." });
    } catch (error) {
      return res.json({ msg: "Error fetching movies." });
    }
  };