document.addEventListener('DOMContentLoaded', function() {
    // Initialize view counter
    incrementViewCount();
    
    // Initialize like button functionality
    initLikeButton();
    
    // Initialize share button functionality
    initShareButton();
    
    // Initialize comment functionality
    initCommentSystem();
});

/**
 * View Counter Implementation
 * Using localStorage to simulate view tracking (in a real app this would be server-side)
 */
function incrementViewCount() {
    // Get the article ID from the URL or data attribute
    const articleId = getArticleId();
    
    // Get the views element
    const viewsElement = document.querySelector('.article-views-count');
    
    if (!viewsElement) return;
    
    // For demonstration purposes, we're using localStorage
    // In a real application, this would be tracked server-side
    let views = localStorage.getItem(`article_${articleId}_views`);
    
    if (!views) {
        views = Math.floor(Math.random() * 100) + 50; // Start with a random number between 50-150
    } else {
        views = parseInt(views) + 1;
    }
    
    // Save back to localStorage
    localStorage.setItem(`article_${articleId}_views`, views);
    
    // Update the view count in the DOM
    viewsElement.textContent = views;
}

/**
 * Like Button Implementation
 */
function initLikeButton() {
    const likeButton = document.querySelector('.like-button');
    const likeCount = document.querySelector('.article-likes-count');
    
    if (!likeButton || !likeCount) return;
    
    const articleId = getArticleId();
    
    // Check if the user has already liked this article
    const isLiked = localStorage.getItem(`article_${articleId}_liked`) === 'true';
    
    // Set initial state
    let count = parseInt(localStorage.getItem(`article_${articleId}_like_count`)) || Math.floor(Math.random() * 50) + 10;
    likeCount.textContent = count;
    
    if (isLiked) {
        likeButton.classList.add('liked');
        likeButton.querySelector('i').classList.remove('far');
        likeButton.querySelector('i').classList.add('fas');
    }
    
    // Handle like button click
    likeButton.addEventListener('click', function() {
        const isNowLiked = likeButton.classList.contains('liked');
        
        if (isNowLiked) {
            // Unlike
            likeButton.classList.remove('liked');
            likeButton.querySelector('i').classList.remove('fas');
            likeButton.querySelector('i').classList.add('far');
            count--;
        } else {
            // Like
            likeButton.classList.add('liked');
            likeButton.querySelector('i').classList.remove('far');
            likeButton.querySelector('i').classList.add('fas');
            count++;
            
            // Add a small animation
            likeButton.classList.add('pulse');
            setTimeout(() => {
                likeButton.classList.remove('pulse');
            }, 300);
        }
        
        // Update like count in DOM and localStorage
        likeCount.textContent = count;
        localStorage.setItem(`article_${articleId}_like_count`, count);
        localStorage.setItem(`article_${articleId}_liked`, !isNowLiked);
    });
}

/**
 * Share Button Implementation
 */
function initShareButton() {
    const shareButton = document.querySelector('.share-button');
    
    if (!shareButton) return;
    
    shareButton.addEventListener('click', function() {
        // Get the current URL
        const url = window.location.href;
        const title = document.querySelector('h1').textContent;
        
        // Use Web Share API if available
        if (navigator.share) {
            navigator.share({
                title: title,
                url: url
            }).catch(err => {
                console.error('Error sharing:', err);
                fallbackShare(url);
            });
        } else {
            fallbackShare(url);
        }
    });
}

function fallbackShare(url) {
    // Create a temporary input to copy the URL
    const input = document.createElement('input');
    input.value = url;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    
    // Show a confirmation message
    const shareButton = document.querySelector('.share-button');
    const originalText = shareButton.innerHTML;
    
    shareButton.innerHTML = '<i class="fas fa-check"></i> Copied!';
    
    setTimeout(() => {
        shareButton.innerHTML = originalText;
    }, 2000);
}

/**
 * Comment System Implementation
 */
function initCommentSystem() {
    const commentForm = document.getElementById('commentForm');
    const commentsContainer = document.querySelector('.comments-list');
    const commentCount = document.querySelector('.article-comments-count');
    const loadMoreBtn = document.querySelector('.load-more-comments');
    
    if (!commentForm || !commentsContainer || !commentCount) return;
    
    const articleId = getArticleId();
    
    // Initialize comments from localStorage
    let comments = JSON.parse(localStorage.getItem(`article_${articleId}_comments`)) || [];
    
    // If no comments in storage, add some dummy ones
    if (comments.length === 0) {
        comments = generateDummyComments();
        localStorage.setItem(`article_${articleId}_comments`, JSON.stringify(comments));
    }
    
    // Update comment count
    updateCommentCount(comments.length);
    
    // Display first 3 comments initially
    displayComments(comments.slice(0, 3));
    
    // Handle "Load More" button visibility
    if (comments.length > 3) {
        loadMoreBtn.style.display = 'block';
    } else {
        loadMoreBtn.style.display = 'none';
    }
    
    // Handle comment form submission
    commentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nameInput = document.getElementById('commentName');
        const emailInput = document.getElementById('commentEmail');
        const contentInput = document.getElementById('commentContent');
        
        if (!nameInput.value || !emailInput.value || !contentInput.value) {
            showFormMessage(commentForm, 'Please fill in all fields', 'error');
            return;
        }
        
        // Create new comment object
        const newComment = {
            id: Date.now(),
            name: nameInput.value,
            email: emailInput.value, // In a real app, this wouldn't be stored in localStorage
            content: contentInput.value,
            date: new Date().toISOString(),
            likes: 0,
            replies: []
        };
        
        // Add to comments array and save to localStorage
        comments.unshift(newComment);
        localStorage.setItem(`article_${articleId}_comments`, JSON.stringify(comments));
        
        // Clear the form
        commentForm.reset();
        
        // Display the updated comments
        displayComments(comments.slice(0, 3));
        
        // Update comment count
        updateCommentCount(comments.length);
        
        // Show success message
        showFormMessage(commentForm, 'Comment posted successfully!', 'success');
        
        // Show load more button if there are more than 3 comments
        if (comments.length > 3) {
            loadMoreBtn.style.display = 'block';
        }
    });
    
    // Handle "Load More" button click
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            const visibleComments = document.querySelectorAll('.comment-item').length;
            
            // Show 3 more comments
            displayComments(comments.slice(0, visibleComments + 3));
            
            // Hide the button if all comments are visible
            if (visibleComments + 3 >= comments.length) {
                loadMoreBtn.style.display = 'none';
            }
        });
    }
    
    // Handle reply form submissions using event delegation
    commentsContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('reply-button')) {
            const commentId = e.target.closest('.comment-item').dataset.commentId;
            const replyForm = document.querySelector(`.reply-form[data-comment-id="${commentId}"]`);
            
            // Toggle reply form visibility
            if (replyForm.style.display === 'block') {
                replyForm.style.display = 'none';
            } else {
                // Hide any other open reply forms
                document.querySelectorAll('.reply-form').forEach(form => {
                    form.style.display = 'none';
                });
                
                replyForm.style.display = 'block';
            }
        }
        
        // Handle reply form submission
        if (e.target.classList.contains('reply-submit')) {
            e.preventDefault();
            
            const commentId = parseInt(e.target.closest('.reply-form').dataset.commentId);
            const nameInput = e.target.closest('.reply-form').querySelector('.reply-name');
            const contentInput = e.target.closest('.reply-form').querySelector('.reply-content');
            
            if (!nameInput.value || !contentInput.value) {
                return; // Simple validation
            }
            
            // Find the comment to reply to
            const updatedComments = comments.map(comment => {
                if (comment.id === commentId) {
                    // Add the reply
                    comment.replies.push({
                        id: Date.now(),
                        name: nameInput.value,
                        content: contentInput.value,
                        date: new Date().toISOString(),
                        likes: 0
                    });
                }
                return comment;
            });
            
            // Update localStorage
            localStorage.setItem(`article_${articleId}_comments`, JSON.stringify(updatedComments));
            
            // Update the comments array
            comments = updatedComments;
            
            // Refresh the display
            displayComments(comments.slice(0, document.querySelectorAll('.comment-item').length));
            
            // Hide the reply form
            e.target.closest('.reply-form').style.display = 'none';
            
            // Update comment count (replies also count as comments)
            const totalComments = getTotalCommentCount(comments);
            updateCommentCount(totalComments);
        }
    });
}

function displayComments(comments) {
    const commentsContainer = document.querySelector('.comments-list');
    
    // Clear existing comments
    commentsContainer.innerHTML = '';
    
    if (comments.length === 0) {
        commentsContainer.innerHTML = '<p class="no-comments">Be the first to comment!</p>';
        return;
    }
    
    comments.forEach(comment => {
        const commentElement = createCommentElement(comment);
        commentsContainer.appendChild(commentElement);
    });
}

function createCommentElement(comment) {
    const commentElement = document.createElement('div');
    commentElement.className = 'comment-item';
    commentElement.dataset.commentId = comment.id;
    
    // Format the date
    const commentDate = new Date(comment.date);
    const formattedDate = commentDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    
    // Create comment HTML
    commentElement.innerHTML = `
        <div class="comment-header">
            <div class="comment-avatar">${comment.name.charAt(0).toUpperCase()}</div>
            <div class="comment-meta">
                <h4 class="comment-author">${comment.name}</h4>
                <span class="comment-date">${formattedDate}</span>
            </div>
        </div>
        <div class="comment-content">
            <p>${comment.content}</p>
        </div>
        <div class="comment-actions">
            <button class="comment-action like-comment">
                <i class="far fa-heart"></i> <span class="like-count">${comment.likes}</span>
            </button>
            <button class="comment-action reply-button">
                <i class="far fa-comment"></i> Reply
            </button>
        </div>
        <div class="reply-form" data-comment-id="${comment.id}" style="display: none;">
            <div class="form-group">
                <input type="text" class="form-control reply-name" placeholder="Your Name" required>
            </div>
            <div class="form-group">
                <textarea class="form-control reply-content" placeholder="Your Reply" required></textarea>
            </div>
            <button class="cta-button reply-submit">Post Reply</button>
        </div>
    `;
    
    // Add replies if there are any
    if (comment.replies && comment.replies.length > 0) {
        const repliesContainer = document.createElement('div');
        repliesContainer.className = 'comment-replies';
        
        comment.replies.forEach(reply => {
            const replyElement = document.createElement('div');
            replyElement.className = 'reply-item';
            
            // Format the reply date
            const replyDate = new Date(reply.date);
            const formattedReplyDate = replyDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
            
            replyElement.innerHTML = `
                <div class="comment-header">
                    <div class="comment-avatar">${reply.name.charAt(0).toUpperCase()}</div>
                    <div class="comment-meta">
                        <h4 class="comment-author">${reply.name}</h4>
                        <span class="comment-date">${formattedReplyDate}</span>
                    </div>
                </div>
                <div class="comment-content">
                    <p>${reply.content}</p>
                </div>
                <div class="comment-actions">
                    <button class="comment-action like-comment">
                        <i class="far fa-heart"></i> <span class="like-count">${reply.likes}</span>
                    </button>
                </div>
            `;
            
            repliesContainer.appendChild(replyElement);
        });
        
        commentElement.appendChild(repliesContainer);
    }
    
    return commentElement;
}

function updateCommentCount(count) {
    const commentCount = document.querySelector('.article-comments-count');
    if (commentCount) {
        commentCount.textContent = count;
    }
}

function getTotalCommentCount(comments) {
    let count = comments.length;
    
    // Add reply counts
    comments.forEach(comment => {
        if (comment.replies) {
            count += comment.replies.length;
        }
    });
    
    return count;
}

function showFormMessage(form, message, type) {
    // Check if there's already a message
    const existingMessage = form.parentNode.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type === 'error' ? 'error' : 'success'}`;
    messageElement.textContent = message;
    
    // Insert before the form
    form.parentNode.insertBefore(messageElement, form);
    
    // Remove after 3 seconds
    setTimeout(() => {
        messageElement.remove();
    }, 3000);
}

function generateDummyComments() {
    return [
        {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            content: "This is a fantastic initiative! I'm inspired by the work you're doing and would love to get involved somehow.",
            date: "2023-05-15T10:30:00Z",
            likes: 8,
            replies: [
                {
                    id: 2,
                    name: "Maria Santos",
                    content: "Thank you John! We'd love to have you on board. You can check out our volunteer page for opportunities.",
                    date: "2023-05-15T11:45:00Z",
                    likes: 3
                }
            ]
        },
        {
            id: 3,
            name: "Sarah Johnson",
            email: "sarah@example.com",
            content: "I participated in last year's event and it was life-changing. The impact these programs have on communities is truly remarkable.",
            date: "2023-05-14T14:20:00Z",
            likes: 12,
            replies: []
        },
        {
            id: 4,
            name: "Michael Chen",
            email: "michael@example.com",
            content: "Is there a way to support this initiative financially? I'd love to contribute to your mission.",
            date: "2023-05-13T09:15:00Z",
            likes: 5,
            replies: [
                {
                    id: 5,
                    name: "Admin",
                    content: "Hi Michael, thank you for your interest! Yes, you can donate through our website's donation page, or contact us directly for other ways to support.",
                    date: "2023-05-13T10:30:00Z",
                    likes: 2
                }
            ]
        },
        {
            id: 6,
            name: "Elena Rodriguez",
            email: "elena@example.com",
            content: "I'm a teacher at a local school and would love to bring these programs to our students. Do you offer educational workshops?",
            date: "2023-05-12T16:45:00Z",
            likes: 7,
            replies: []
        }
    ];
}

/**
 * Helper functions
 */
function getArticleId() {
    // In a real app, this would get the article ID from the URL or a data attribute
    // For this demo, we'll just use a fixed ID
    return document.querySelector('article').dataset.articleId || '1';
} 