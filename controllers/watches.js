import { Watch } from "../models/watch.js";

function create(req, res) {
  req.body.owner = req.user.profile
  Watch.create(req.body)
  .then(watch => {
    Watch.findById(watch._id)
    .populate('owner')
    .then(populatedWatch => {
      res.json(populatedWatch)
    })
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({err: err.errmsg})
  })
}

function index(req, res) {
  Watch.find({})
  .populate('owner')
  .then(watches => {
    res.json(watches)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({err: err.errmsg})
  })
}

function deleteOne(req, res) {
  Watch.findById(req.params.id)
  .then(watch => {
    if (watch.owner._id.equals(req.user.profile)) {
      Watch.findByIdAndDelete(watch._id)
      .then(deletedWatch => {
        res.json(deletedWatch)
      })
    } else {
      res.status(401).json({err: "Not authorized"})
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({err: err.errmsg})
  })
}

function update(req, res) {
  Watch.findById(req.params.id)
  .then(watch => {
    if (watch.owner._id.equals(req.user.profile)) {
      Watch.findByIdAndUpdate(req.params.id, req.body, {new: true})
      .populate('owner')
      .then(updatedWatch => {
        res.json(updatedWatch)
      })
    } else {
      res.status(401).json({err: "Not authorized"})
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({err: err.errmsg})
  })
}

export{
  create,
  index,
  deleteOne as delete,
  update,
}