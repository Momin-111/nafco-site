/* ========================================
   NAFCO Aluminium — contact form
   Sends directly to sales@alunafco.com via
   FormSubmit; falls back to the visitor's
   mail app if the service is unreachable.
   ======================================== */

(function () {
    var form = document.getElementById('contact-form');
    if (!form) return;
    var isArabic = document.documentElement.lang === 'ar';
    var ENDPOINT = 'https://formsubmit.co/ajax/sales@alunafco.com';

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var btn = form.querySelector('.submit-btn');
        var success = document.getElementById('form-success');
        var data = new FormData(form);
        var name = data.get('name');
        var email = data.get('email');
        var phone = data.get('phone');
        var company = data.get('company') || (isArabic ? 'غير محدد' : 'N/A');
        var type = data.get('project_type') || (isArabic ? 'غير محدد' : 'N/A');
        var message = data.get('message');

        var subject = isArabic
            ? 'استفسار مشروع من ' + name + ' موقع نافكو'
            : 'Project Inquiry from ' + name + ' NAFCO Website';

        function showSuccess() {
            form.style.display = 'none';
            success.style.display = 'block';
        }

        function mailtoFallback() {
            var body;
            if (isArabic) {
                body = encodeURIComponent(
                    'الاسم: ' + name + '\n' +
                    'الشركة: ' + company + '\n' +
                    'الجوال: ' + phone + '\n' +
                    'البريد: ' + email + '\n' +
                    'نوع المشروع: ' + type + '\n\n' +
                    'الرسالة:\n' + message
                );
            } else {
                body = encodeURIComponent(
                    'Name: ' + name + '\n' +
                    'Company: ' + company + '\n' +
                    'Phone: ' + phone + '\n' +
                    'Email: ' + email + '\n' +
                    'Project Type: ' + type + '\n\n' +
                    'Message:\n' + message
                );
            }
            window.location.href = 'mailto:sales@alunafco.com?subject=' + encodeURIComponent(subject) + '&body=' + body;
            showSuccess();
        }

        var originalBtn = btn.innerHTML;
        btn.disabled = true;
        btn.textContent = isArabic ? 'جارٍ الإرسال...' : 'Sending...';

        fetch(ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
                name: name,
                company: company,
                phone: phone,
                email: email,
                project_type: type,
                message: message,
                _subject: subject,
                _template: 'table',
                _captcha: 'false'
            })
        })
            .then(function (r) { return r.json(); })
            .then(function (res) {
                if (res && (res.success === 'true' || res.success === true)) {
                    showSuccess();
                } else {
                    throw new Error('formsubmit rejected');
                }
            })
            .catch(function () {
                btn.disabled = false;
                btn.innerHTML = originalBtn;
                mailtoFallback();
            });
    });
})();
