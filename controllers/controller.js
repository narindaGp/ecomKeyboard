

class Controller{
  static getLogin(req, res){
    res.render('login')
  }

  static getLanding(req, res){
    res.render('landing')
  }
}

module.exports = Controller