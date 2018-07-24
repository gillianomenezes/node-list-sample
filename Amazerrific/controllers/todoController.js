var ToDo = require('../models/ToDo.js'),
    ToDosController = {};

ToDosController.index = function(req, res){
    ToDo.find({}, function(err, ToDos){
        if(err !== null){
            res.json(500, err);
        }else{
            res.json(ToDos);
        }        
    })
}

ToDosController.create = function(req, res){
    var newToDo = new ToDo({"description":req.body.description,
                            "tags": req.body.tags});

    newToDo.save(function(err, result){
        console.log(result);

        if(err !== null){
            console.log(err);
            res.json(500, err);
        }else{
            res.json(200, result);
        }
    })
}

ToDosController.update = function(req, res){
    const doc = {
        "description": req.body.description,
        "tags":req.body.tags
    };

    ToDo.update({_id:req.params.id}, doc, function(err, result){
        if(err !== null){
            res.json(500, err);
        }else{
            res.json(200,result);
        }
    });
}

ToDosController.destroy = function(req, res){
    ToDo.findByIdAndDelete(req.params.id, function(err, result){
        if(err != null){
            res.json(500, err);
        }
        else{
            res.json(200, result);
        }
    });
}

ToDosController.tags = function(req, res){
    ToDo.distinct('tags', function(err, result){
        if(err) return res.json(500, err);

        return res.send(result);
    })
}

ToDosController.findByTag = function(req, res){
    ToDo.find({tags: req.params.tag}, function(err, result){
        if(err) return res.json(500, err);

        return res.json(result);
    })
}

module.exports = ToDosController;