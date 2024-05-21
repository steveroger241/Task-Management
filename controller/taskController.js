const authModel = require('../model/authModel.js');
const taskModel = require('../model/taskModel.js');
const mongoose = require('mongoose');


async function createController(req, res) {
    try {
        const find = await authModel.findOne({ email: req.body.email });
        if (find) {
            const user = await taskModel.findOne({ id: find._id });

            if (user) {
                const result = await taskModel.updateOne(
                    { id: find._id },
                    {
                        $push:
                        {
                            task: {
                                taskid: new mongoose.Types.ObjectId(),
                                heading: req.body.heading ? req.body.heading : "New Task",
                                description: req.body.description ? req.body.description : "Description..."
                            }
                        }
                    }
                );
                if (result) {
                    return res.send({
                        success: true,
                        message: "Created successfully"
                    });
                }
                else {
                    return res.send({
                        success: false,
                        error: "Unable to create tasks"
                    })
                }
            }
            else {
                const result = await taskModel.create(
                    {
                        id: find._id,
                        task: [{
                            taskid: new mongoose.Types.ObjectId(),
                            heading: req.body.heading ? req.body.heading : "New Task",
                            description: req.body.description ? req.body.description : "Description..."
                        }]
                    }
                );
                if (result) {
                    return res.send({
                        success: true,
                        message: "Created successfully"
                    });
                }
                else {
                    return res.send({
                        success: false,
                        error: "Unable to create tasks"
                    })
                }
            }
        }
        else {
            return res.send({
                success: false,
                error: "Email not found"
            })
        }
    }
    catch (err) {
        console.log("Server error is: ", err);
        return res.send("Server error from create tasks");
    }
}

async function readController(req, res) {
    try {

        const user = await authModel.findOne({ email: req.body.email });
        if (!user) {
            return res.send({
                success: false,
                error: "Email doesn't exist sign in to add task"
            });
        }

        const result = await taskModel.find({ id: user._id });
        if (result) {
            return res.send({
                success: true,
                message: "Data fetched successfully",
                result
            });
        }
        else {
            return res.send({
                success: false,
                error: "Unable to find any tasks"
            });
        }
    }
    catch (err) {
        console.log("Server error is: ", err);
        return res.send("Server error from reading tasks");
    }
}

async function updateController(req, res) {
    try {
        const result = await taskModel.updateOne(
            { "task.taskid": req.body.id },
            {
                $set: {
                    "task.$.heading": req.body.heading,
                    "task.$.description": req.body.description
                }
            }
        )

        if (result) {
            return res.send({
                success: true,
                message: "Updated successfully"
            });
        }
        else {
            return res.send({
                success: false,
                error: "Error while updating the tasks"
            });
        }
    }
    catch (err) {
        console.log("Server error is: ", err);
        return res.send("Server error from updating tasks");
    }
}

async function deleteController(req, res) {
    try {
        const result = await taskModel.updateOne(
            { "task.taskid": req.body.id },
            { $pull: { task: { taskid: req.body.id } } }
        )

        if (result) {
            return res.send({
                success: true,
                message: "Deleted successfully"
            });
        }
        else {
            return res.send({
                success: false,
                error: "Error while deleting the task"
            });
        }
    }
    catch (err) {
        console.log("Server error is: ", err);
        return res.send("Server error from deletig tasks");
    }
}

async function doneController(req, res) {
    try {
        const result = await taskModel.updateOne(
            { "task.taskid": req.body.id },
            { $set: { "task.$.completed": true } }
        );

        if (result) {
            return res.send({
                success: true,
                message: "Marked successfully"
            });
        }
        else {
            return res.send({
                success: false,
                error: "Error while marking the task"
            });
        }
    }
    catch (err) {
        console.log("Server error is: ", err);
        return res.send("Server error from marking tasks");
    }
}

async function unDoneController(req, res) {
    try {
        const result = await taskModel.updateOne(
            { "task.taskid": req.body.id },
            { $set: { "task.$.completed": false } }
        );

        if (result) {
            return res.send({
                success: true,
                message: "Marked successfully"
            });
        }
        else {
            return res.send({
                success: false,
                error: "Error while marking the task"
            });
        }
    }
    catch (err) {
        console.log("Server error is: ", err);
        return res.send("Server error from marking tasks");
    }
}

async function searchController(req, res) {
    try {
        const user = await authModel.findOne({ email: req.body.email });
        if (!user) {
            return res.send({
                success: false,
                error: "Email not found"
            });
        }

        const result = await taskModel.find({
            id: user._id,
            $or: [
                { "task.heading": { $regex: req.body.searchTerm, $options: "i" } },
                { "task.description": { $regex: req.body.searchTerm, $options: "i" } }
            ]
        });

        if (result.length === 0) {
            return res.send({
                success: false,
                error: "No matching tasks found"
            });
        }

        const matchingTasks = result.flatMap(doc =>
            doc.task.filter(t =>
                new RegExp(req.body.searchTerm, 'i').test(t.heading) ||
                new RegExp(req.body.searchTerm, 'i').test(t.description)
            )
        );

        // console.log(matchingTasks);
        return res.send({
            success: true,
            message: "Search completed successfully",
            result: matchingTasks
        });

    } catch (err) {
        console.log("Server error:", err);
        return res.send("Server error during task search");
    }
}


module.exports = { createController, readController, updateController, deleteController, doneController, unDoneController, searchController };