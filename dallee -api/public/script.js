async function generateImage(prompt) {
    const params = new URLSearchParams({
        key: prompt,
        t: 0.2,
        f: 'dalle3',
        demo: 'true',
        count: 1
    });

    try {
        const response = await fetch(`https://prompt.glitchy.workers.dev/gen?${params}`);
        const data = await response.json();

        if (data.status === 1 && data.images) {
            return {
                success: true,
                image_url: data.images[0].imagedemo1[0]
            };
        }
        return { success: false };
    } catch (error) {
        console.error('Hata:', error);
        return { success: false };
    }
}

document.getElementById('generateForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const loading = document.getElementById('loading');
    const result = document.getElementById('result');
    const generatedImage = document.getElementById('generatedImage');
    const prompt = document.getElementById('prompt').value;
    
    loading.classList.remove('hidden');
    result.classList.add('hidden');
    
    try {
        const data = await generateImage(prompt);
        
        if (data.success) {
            generatedImage.src = data.image_url;
            result.classList.remove('hidden');
        } else {
            alert('Resim oluşturulamadı. Lütfen tekrar deneyin.');
        }
    } catch (error) {
        alert('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
        loading.classList.add('hidden');
    }
}); 