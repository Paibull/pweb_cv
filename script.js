document.addEventListener('DOMContentLoaded', function() {

    var header = document.getElementById('header');
    if (header) header.classList.add('loaded');

    var scrollBtn = document.getElementById('scroll-top-btn');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    var sections = document.querySelectorAll('.cv-section');
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    for (var i = 0; i < sections.length; i++) {
        observer.observe(sections[i]);
    }

    document.getElementById('print-btn').addEventListener('click', function() {
        var allEntries = document.querySelectorAll('.entry');
        for (var i = 0; i < allEntries.length; i++) {
            allEntries[i].classList.add('expanded');
        }
        setTimeout(function() { window.print(); }, 100);
    });

    var entries = document.querySelectorAll('.entry');

    entries.forEach(function(entry) {
        var entryHeader = entry.querySelector('.entry-header');
        var role = entry.querySelector('.entry-role');
        var details = entry.querySelectorAll('.entry-desc, ul');

        if (details.length === 0 && !role) return;

        entry.classList.add('collapsible');

        var arrow = document.createElement('span');
        arrow.className = 'expand-arrow';
        arrow.textContent = '\u25B8';
        entryHeader.querySelector('.entry-title').prepend(arrow);

        entryHeader.addEventListener('click', function() {
            entry.classList.toggle('expanded');
        });

        var timeout;
        entry.addEventListener('mouseenter', function() {
            if (window.matchMedia('(hover: hover)').matches) {
                clearTimeout(timeout);
                timeout = setTimeout(function() {
                    entry.classList.add('expanded');
                }, 150);
            }
        });
        entry.addEventListener('mouseleave', function() {
            if (window.matchMedia('(hover: hover)').matches) {
                clearTimeout(timeout);
                timeout = setTimeout(function() {
                    entry.classList.remove('expanded');
                }, 300);
            }
        });
    });

});
