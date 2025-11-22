// src/controllers/comment.controller.js
import asyncHandler from 'express-async-handler';
import * as commentService from '../../../services/comment.service.js';
import { ApiResponse } from '../../../utils/ApiResponse.js';

// GET all comments
export const getAllComments = asyncHandler(async (req, res) => {
    const comments = await commentService.getAllComments();
    res.status(200).json(new ApiResponse(200, comments, 'All comments retrieved successfully'));
});

// GET comments by post ID
export const getCommentsByPostId = asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.postId, 10);
    const comments = await commentService.getCommentsByPostId(postId);
    res.status(200).json(new ApiResponse(200, comments, 'Comments for post retrieved successfully'));
});

// CREATE comment for a post
export const createCommentForPost = asyncHandler(async (req, res) => {
  const postId = parseInt(req.params.postId, 10);
  const { text, authorId } = req.body;
  const newComment = await commentService.createComment({ postId, authorId, text });
  res.status(201).json(new ApiResponse(201, newComment, 'Comment created successfully'));
});

// Existing functions (optional, can be kept if needed)
export const getCommentById = asyncHandler(async (req, res) => {
    const comment = await commentService.getCommentById(req.params.id);
    res.status(200).json(new ApiResponse(200, comment, 'Comment retrieved successfully'));
});

export const updateComment = asyncHandler(async (req, res) => {
    const updatedComment = await commentService.updateComment(req.params.id, req.body);
    res.status(200).json(new ApiResponse(200, updatedComment, 'Comment updated successfully'));
});

export const deleteComment = asyncHandler(async (req, res) => {
    await commentService.deleteComment(req.params.id);
    res.status(204).json(new ApiResponse(204, null, 'Comment deleted successfully'));
});
