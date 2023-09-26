import { validationResult } from "express-validator";
import studentModel from "../models/student.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
class userController{

    async getAllStudents(req,res){
        try{
            const students = await studentModel.find();
            return res.status(200).json({
                message:"Get students successfully",
                "data":students
            })
        }
        catch(err){
            return res.status(500).json({
                message:"Get students failed",
                error:err
            })
        }
    }

    async getAllStudentsPaging(req,res){
        try{
            const page = req.query?.page || 1;
            const size = req.query?.size || 5;
            const searchString = req.query?.searchString || '';
            const students = await studentModel.find().skip((page-1)*size).limit(size).find({
                $or:[
                    {name:{$regex:searchString}},
                    {email:{$regex:searchString}}
                ]
            });
            return res.status(200).json({
                message:"Get students successfully",
                "data":students
            })
        }
        catch(err){
            return res.status(500).json({
                message:"Get students failed",
                error:err
            })
        }
    }

    async getSingleStudent(req,res){
        try{
            const {id} = req.params;
            const students = await studentModel.findById(id);
            if(students){
                return res.status(200).json({
                    message:"Get detail student successfully",
                    "data":students
                })
            }
            else{
                return res.status(400).json({
                    message:"Student not found"
                })
            }
        }
        catch(err){
            return res.status(500).json({
                message:"Get students failed",
                error:err
            })
        }
    }

    async createStudent(req,res){
        try{
            const body = req.body;
            const student = await studentModel.findOne({email:body.email});
            if(!student){
                const user = new studentModel({
                    ...body
                });
                await user.save();   
                return res.status(200).json({
                    message:"Create student successfully",
                    "data":user
                })
            }
            else{
                return res.status(400).json({
                    message:"Email already exists"
                })
            }
        }
        catch(err){
            return res.status(500).json({
                message:"Get students failed",
                error:err
            })
        }
    }
    
    async deleteStudent(req,res){
        try{
            const {id} = req.params;
            const students = await studentModel.findByIdAndDelete(id);
            if(students){
                return res.status(200).json({
                    message:"Delete student successfully",
                    "data":students
                })
            }
            else{
                return res.status(400).json({
                    message:"Student not found"
                })
            }
        }
        catch(err){
            return res.status(500).json({
                message:"Get students failed",
                error:err
            })
        }
    }

    async getToken(req,res){
        try{
            const {id} = req.params;
            const token = jwt.sign({
                id:id
            },process.env.JWT_SECRET,{
                expiresIn:120
            });
            return res.status(200).json({
                message:"Get token successfully",
                token:token
            })
        }
        catch(err){
            return res.status(500).json({
                message:"Get token failed",
                error:err
            })
        }
    }
}

export default new userController;