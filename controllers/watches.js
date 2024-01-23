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

export{
  create,
  index,
}