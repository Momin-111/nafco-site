/* ========================================
   NAFCO Aluminium — contact form (mailto)
   ======================================== */

(function () {
    var form = document.getElementById('contact-form');
    if (!form) return;
    var isArabic = document.documentElement.lang === 'ar';

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var success = document.getElementById('form-success');
        var data = new FormData(form);
        var name = data.get('name');
        var email = data.get('email');
        var phone = data.get('phone');
        var company = data.get('company') || (isArabic ? 'غير محدد' : 'N/A');
        var type = data.get('project_type') || (isArabic ? 'غير محدد' : 'N/A');
        var message = data.get('message');

        var subject, body;
        if (isArabic) {
            subject = encodeURIComponent('استفسار مشروع من ' + name + ' موقع نافكو');
            body = encodeURIComponent(
                'الاسم: ' + name + '\n' +
                'الشركة: ' + company + '\n' +
                'الجوال: ' + phone + '\n' +
                'البريد: ' + email + '\n' +
                'نوع المشروع: ' + type + '\n\n' +
                'الرسالة:\n' + message
            );
        } else {
            subject = encodeURIComponent('Project Inquiry from ' + name + ' NAFCO Website');
            body = encodeURIComponent(
                'Name: ' + name + '\n' +
                'Company: ' + company + '\n' +
                'Phone: ' + phone + '\n' +
                'Email: ' + email + '\n' +
                'Project Type: ' + type + '\n\n' +
                'Message:\n' + message
            );
        }

        window.location.href = 'mailto:sales@alunafco.com?subject=' + subject + '&body=' + body;
        form.style.display = 'none';
        success.style.display = 'block';
    });
})();
