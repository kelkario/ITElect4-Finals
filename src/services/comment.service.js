// src/services/comment.service.js
import pool from '../config/db.js';
import { ApiError } from '../utils/ApiError.js';

export const getAllComments = async () => {
    const [rows] = await pool.query('SELECT * FROM comments');
    return rows;
};


export const getCommentsByPostId = async (postId) => {
    const [rows] = await pool.query('SELECT * FROM comments WHERE postId = ?', [postId]);
    return rows;
};

export const createComment = async ({ postId, authorId, text }) => {
    try {
        // Insert comment into table
        const [result] = await pool.query(
            'INSERT INTO comments (content, postId, authorId) VALUES (?, ?, ?)',
            [text, postId, authorId]
        );

        // Fetch the inserted comment
        const [rows] = await pool.query('SELECT * FROM comments WHERE id = ?', [result.insertId]);
        return rows[0];
    } catch (error) {
        // Handle invalid postId or authorId
        if (error.code === 'ER_NO_REFERENCED_ROW_2') {
            throw new ApiError(400, 'Invalid postId or authorId. The specified post or user does not exist.');
        }
        // Re-throw other errors
        throw error;
    }
};


export const getCommentById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM comments WHERE id = ?', [id]);
    if (!rows[0]) throw new ApiError(404, 'Comment not found');
    return rows[0];
};

export const updateComment = async (id, { content }) => {
    const [result] = await pool.query('UPDATE comments SET content = ? WHERE id = ?', [content, id]);
    if (result.affectedRows === 0) throw new ApiError(404, 'Comment not found');
    return getCommentById(id);
};

export const deleteComment = async (id) => {
    const [result] = await pool.query('DELETE FROM comments WHERE id = ?', [id]);
    if (result.affectedRows === 0) throw new ApiError(404, 'Comment not found');
    return true;
};
