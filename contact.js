document.addEventListener('DOMContentLoaded', function() {
    // تهيئة Firebase
    const firebaseConfig = {
        apiKey: "AIzaSyByT4A26ibE-L35_yBXPqQcJAAycsHfs1A",
        authDomain: "testjoy-2958c.firebaseapp.com",
        projectId: "testjoy-2958c",
        storageBucket: "testjoy-2958c.firebasestorage.app",
        messagingSenderId: "1013945106894",
        appId: "1:1013945106894:web:75b21f6534c21786786b9f",
        measurementId: "G-QM2Y6ZN8SX"
    };

    // تهيئة Firebase إذا لم يكن مهيأ بالفعل
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    const db = firebase.firestore();

    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // جمع بيانات النموذج
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        };

        try {
            // حفظ الرسالة في Firestore
            await db.collection('messages').add(formData);

            // إنشاء عنصر الرسالة المنبثقة
            const popup = document.createElement('div');
            popup.className = 'message-popup show';
            popup.innerHTML = `
                <div class="message-card">
                    <div class="success-animation">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h3>تم إرسال رسالتك بنجاح</h3>
                    <p>شكراً لتواصلك معنا. سيتم الرد على رسالتك في أقرب وقت ممكن.</p>
                    <button onclick="closeMessagePopup(this)" class="close-btn">حسناً</button>
                </div>
            `;
            
            document.body.appendChild(popup);
            
            // إعادة تعيين النموذج
            contactForm.reset();

        } catch (error) {
            console.error("خطأ في حفظ الرسالة:", error);
            // إظهار رسالة خطأ للمستخدم
            const popup = document.createElement('div');
            popup.className = 'message-popup show';
            popup.innerHTML = `
                <div class="message-card error">
                    <div class="error-animation">
                        <i class="fas fa-times-circle"></i>
                    </div>
                    <h3>حدث خطأ</h3>
                    <p>عذراً، حدث خطأ أثناء إرسال رسالتك. يرجى المحاولة مرة أخرى.</p>
                    <button onclick="closeMessagePopup(this)" class="close-btn">حسناً</button>
                </div>
            `;
            document.body.appendChild(popup);
        }
    });
});

// دالة إغلاق الرسالة المنبثقة
function closeMessagePopup(button) {
    const popup = button.closest('.message-popup');
    popup.classList.remove('show');
    setTimeout(() => {
        popup.remove();
    }, 300);
}

// إغلاق النافذة المنبثقة عند النقر خارجها
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('message-popup')) {
        closeMessagePopup(e.target.querySelector('.close-btn'));
    }
});