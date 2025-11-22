// src/api/v2/controllers/post.controller.js
import { validationResult } from 'express-validator';
import * as postService from '../../../services/post.service.js';
import asyncHandler from '../../../utils/asyncHandler.js';

// GET all posts - V2 format
export const getAllPosts = asyncHandler(async (req, res) => {
    const posts = postService.getAllPosts();
    const v2Posts = posts.map(post => ({
        id: post.id,
        title: post.title,
        body: post.content,
        author: post.author || null
    }));
    res.json(v2Posts);
});

// GET post by ID - V2 format
export const getPostById = asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const post = postService.getPostById(postId);
    res.json({ 
        id: post.id, 
        title: post.title, 
        body: post.content,
        author: post.author || null
    });
});

// CREATE post - V2 format
export const createPost = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { title, body, author } = req.body; // include optional author
    const newPost = postService.createPost({ title, content: body, author });

    res.status(201).json({ 
        id: newPost.id, 
        title: newPost.title, 
        body: newPost.content,
        author: newPost.author || null
    });
});

// UPDATE post (PUT) - V2 format
export const updatePost = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const postId = parseInt(req.params.id, 10);
    const { title, body, author } = req.body;
    const updatedPost = postService.updatePost(postId, { title, content: body, author });

    res.json({
        id: updatedPost.id,
        title: updatedPost.title,
        body: updatedPost.content,
        author: updatedPost.author || null
    });
});

// PARTIAL UPDATE (PATCH) - V2 format
export const partiallyUpdatePost = asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const updates = {};
    if (req.body.title !== undefined) updates.title = req.body.title;
    if (req.body.body !== undefined) updates.content = req.body.body;
    if (req.body.author !== undefined) updates.author = req.body.author;

    const updatedPost = postService.partiallyUpdatePost(postId, updates);

    res.json({
        id: updatedPost.id,
        title: updatedPost.title,
        body: updatedPost.content,
        author: updatedPost.author || null
    });
});

// DELETE post - V2 format
export const deletePost = asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.id, 10);
    postService.deletePost(postId);
    res.status(204).send();
});
