// src/services/post.service.js
import pool from '../config/db.js';
import { ApiError } from '../utils/ApiError.js';

export const getAllPosts = async () => {
    const [posts] = await pool.query('SELECT * FROM posts');
    return posts;
};

export const getPostById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM posts WHERE id = ?', [id]);
    if (!rows[0]) {
        throw new ApiError(404, "Post not found"); // Throws a specific error
    }
    return rows[0];
};

export const getPostsByAuthorId = async (userId) => {
    const [rows] = await db.execute(
        'SELECT * FROM posts WHERE authorId = ?',
        [userId]
    );
    return rows;
};

export const createPost = async (postData, authorId) => {
    const { title, content } = postData; // No longer need authorId from here
    try {
        const [result] = await pool.query(
            'INSERT INTO posts (title, content, authorId) VALUES (?, ?, ?)',
            [title, content, authorId] // Use the authorId from the argument
        );
        const newPost = await getPostById(result.insertId);
        return newPost;
    } catch (error) {
        // This will catch if the authorId does not exist in the users table
        if (error.code === 'ER_NO_REFERENCED_ROW_2') {
            throw new ApiError(400, "Invalid author ID. User does not exist.");
        }
        throw error;
    }
};

    export const updatePost = async (id, postData, userId) => { // Add userId as an argument
    const { title, content } = postData;

    // First, get the post to check for ownership
    const post = await getPostById(id); // This will throw a 404 if not found

    // AUTHORIZATION CHECK
    if (post.authorId !== userId) {
        throw new ApiError(403, "Forbidden: You do not have permission to edit this post.");
    }

    // If the check passes, proceed with the update
    await pool.query(
        'UPDATE posts SET title = ?, content = ? WHERE id = ?',
        [title, content, id]
    );
    const updatedPost = await getPostById(id);
    return updatedPost;
};


    export const partiallyUpdatePost = async (id, updates) => {
        const fields = Object.keys(updates);
        const values = Object.values(updates);

        if (fields.length === 0) {
            return getPostById(id);
        }
        
        const setClause = fields.map(field => `${field} = ?`).join(', ');
        
        const [result] = await pool.query(
            `UPDATE posts SET ${setClause} WHERE id = ?`,
            [...values, id]
        );

        if (result.affectedRows === 0) {
            return null;
        }
        return getPostById(id);
    };

   export const deletePost = async (id, userId) => { // Add userId as an argument
    // First, get the post to check for ownership
    const post = await getPostById(id); // This will throw a 404 if not found

    // AUTHORIZATION CHECK
    if (post.authorId !== userId) {
        throw new ApiError(403, "Forbidden: You do not have permission to delete this post.");
    }
    
    // If the check passes, proceed with the deletion
    const [result] = await pool.query('DELETE FROM posts WHERE id = ?', [id]);
    return result.affectedRows;
};

/*import NotFoundError from '../utils/NotFoundError.js';

let posts = [
    { id: 1, title: 'First Post', content: 'This is the first post.' },
    { id: 2, title: 'Second Post', content: 'This is the second post.' }
];
let nextId = 3;

// GET all posts
export const getAllPosts = () => {
    return posts;
};

// GET post by ID
export const getPostById = (id) => {
    const post = posts.find(p => p.id === id);
    if (!post) {
        throw new NotFoundError(`Post with ID ${id} not found.`);
    }
    return post;
};

// CREATE post
export const createPost = (postData) => {
    const newPost = { id: nextId++, ...postData };
    posts.push(newPost);
    return newPost;
};

// UPDATE post (PUT) - full update
export const updatePost = (id, postData) => {
    const postIndex = posts.findIndex(p => p.id === id);
    if (postIndex === -1) {
        throw new NotFoundError(`Post with ID ${id} not found.`);
    }
    // Merge all provided fields; if author is included, it is updated
    posts[postIndex] = {
        ...posts[postIndex],
        title: postData.title,
        content: postData.content,
        author: postData.author !== undefined ? postData.author : posts[postIndex].author
    };
    return posts[postIndex];
};

// PARTIAL UPDATE (PATCH)
export const partiallyUpdatePost = (id, updates) => {
    const postIndex = posts.findIndex(p => p.id === id);
    if (postIndex === -1) {
        throw new NotFoundError(`Post with ID ${id} not found.`);
    }
    const updatedPost = { ...posts[postIndex], ...updates };
    posts[postIndex] = updatedPost;
    return updatedPost;
};

// DELETE post
export const deletePost = (id) => {
    const postIndex = posts.findIndex(p => p.id === id);
    if (postIndex === -1) {
        throw new NotFoundError(`Post with ID ${id} not found.`);
    }
    posts.splice(postIndex, 1);
    return true;
};
*/