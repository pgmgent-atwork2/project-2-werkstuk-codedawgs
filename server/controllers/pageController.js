export const home = async (req, res) => {
    res.render("pages/home", {
        title: "Home",
        first_name: req.user.first_name,
        admin: req.user.admin,
    })
};  