// Confetti Animation
function createConfetti() {
    const confettiContainer = document.getElementById('confetti-container');
    const colors = ['#FFB6C1', '#DDA0DD', '#87CEEB', '#F0E68C', '#98FB98', '#FFA07A'];
    
    function createConfettiPiece() {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        confetti.style.animationDelay = Math.random() * 2 + 's';
        
        // Random shapes
        if (Math.random() > 0.5) {
            confetti.style.borderRadius = '50%';
        } else {
            confetti.style.transform = 'rotate(45deg)';
        }
        
        confettiContainer.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, 5000);
    }
    
    // Create initial burst
    for (let i = 0; i < 50; i++) {
        setTimeout(createConfettiPiece, i * 100);
    }
    
    // Continue creating confetti periodically
    setInterval(() => {
        for (let i = 0; i < 5; i++) {
            setTimeout(createConfettiPiece, i * 200);
        }
    }, 3000);
}

// Enhanced Balloon Animation
function enhanceBalloons() {
    const balloons = document.querySelectorAll('.balloon');
    
    balloons.forEach((balloon, index) => {
        // Add random movement
        setInterval(() => {
            const currentLeft = parseFloat(balloon.style.left) || (index * 20 + 10);
            const newLeft = currentLeft + (Math.random() - 0.5) * 5;
            
            // Keep balloons within viewport
            if (newLeft > 0 && newLeft < 90) {
                balloon.style.left = newLeft + '%';
            }
        }, 2000 + index * 500);
        
        // Add click interaction
        balloon.addEventListener('click', () => {
            balloon.style.animation = 'none';
            balloon.style.transform = 'translateY(-100vh) rotate(360deg)';
            balloon.style.transition = 'all 2s ease-in';
            
            setTimeout(() => {
                balloon.style.animation = 'float 6s ease-in-out infinite';
                balloon.style.transform = 'translateY(0px) rotate(0deg)';
                balloon.style.transition = 'none';
            }, 2000);
        });
    });
}

// Document Download Functionality
async function downloadMessage() {
    try {
        const messageContent = document.getElementById('birthday-message').innerText;
        
        // Create a new document
        const doc = new docx.Document({
            sections: [{
                properties: {},
                children: [
                    new docx.Paragraph({
                        children: [
                            new docx.TextRun({
                                text: "Happy Birthday Babi!",
                                bold: true,
                                size: 32,
                                color: "8B4B9B"
                            })
                        ],
                        alignment: docx.AlignmentType.CENTER,
                        spacing: { after: 400 }
                    }),
                    new docx.Paragraph({
                        children: [
                            new docx.TextRun({
                                text: "A Special Birthday Message",
                                bold: true,
                                size: 24,
                                color: "6B46C1"
                            })
                        ],
                        alignment: docx.AlignmentType.CENTER,
                        spacing: { after: 600 }
                    })
                ]
            }]
        });

        // Split message content into paragraphs
        const paragraphs = messageContent.split('\n\n').filter(p => p.trim());
        
        paragraphs.forEach(paragraph => {
            if (paragraph.trim()) {
                doc.addSection({
                    children: [
                        new docx.Paragraph({
                            children: [
                                new docx.TextRun({
                                    text: paragraph.trim(),
                                    size: 22
                                })
                            ],
                            spacing: { after: 300 }
                        })
                    ]
                });
            }
        });

        // Generate and download the document
        const blob = await docx.Packer.toBlob(doc);
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Birthday_Message_for_Achi.docx';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        // Show success message
        showNotification('Message downloaded successfully! 🎉');
        
    } catch (error) {
        console.error('Error creating document:', error);
        // Fallback: create a simple text file
        downloadAsText();
    }
}

// Fallback function to download as text file
function downloadAsText() {
    const messageContent = document.getElementById('birthday-message').innerText;
    const blob = new Blob([messageContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Birthday_Message_for_Achi.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('Message downloaded as text file! 📄');
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #8B4B9B, #6B46C1);
        color: white;
        padding: 15px 25px;
        border-radius: 50px;
        font-weight: 500;
        z-index: 1000;
        box-shadow: 0 5px 15px rgba(139, 75, 155, 0.3);
        animation: slideIn 0.5s ease-out;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease-in forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 500);
    }, 3000);
}

// Add CSS for notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Photo gallery hover effects
function initPhotoGallery() {
    const photoCards = document.querySelectorAll('.photo-card');
    
    photoCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Smooth scrolling for better UX
function initSmoothScrolling() {
    document.documentElement.style.scrollBehavior = 'smooth';
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Start confetti animation
    setTimeout(createConfetti, 1000);
    
    // Enhance balloons
    enhanceBalloons();
    
    // Initialize photo gallery effects
    initPhotoGallery();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Add download button event listener
    const downloadBtn = document.getElementById('download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', downloadMessage);
    }
    
    // Add some sparkle effects on scroll
    let ticking = false;
    
    function updateSparkles() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        document.querySelectorAll('.balloon').forEach((balloon, index) => {
            balloon.style.transform = `translateY(${rate * (index + 1) * 0.1}px)`;
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateSparkles);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
    
    // Welcome message
    setTimeout(() => {
        showNotification('Welcome to Your Birthday Gift! 🎂');
    }, 2000);
});