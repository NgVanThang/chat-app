function DownloadPage() {
  const handleChangeFile = async (e) => {
    const files = e.target.files[0];

    if (!files) return;

    //  if (file.type.split('/')[0] !== 'image') return;

    const config = {
      cloud_name: 'dmbmugbvi',
      api_key: '866195849213975',
      api_secret: '-QPbqw1xe5BtHlFX_-Fy7HW6Bgc', // Click 'View API Keys' above to copy your API secret
      secure: true,
      file: files,
      upload_preset: 'hmzbfqdx',
    };

    const form = new FormData();
    for (const key in config) {
      form.append(key, config[key]);
    }

    const api = 'https://api.cloudinary.com/v1_1/dmbmugbvi/image/upload';
    try {
      const response = await fetch(api, { method: 'POST', body: form });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <video src="/video/UpscaleVideo_2_20241114.mp4" controls width={200} height={'auto'}></video>
      <a href="/video/UpscaleVideo_2_20241114.mp4" download>
        tai xuong
      </a>
      <a href="/video/UpscaleVideo_2_20241114.mp4" target="_blank">
        mo trang moi
      </a>
      <input type="file" multiple onChange={handleChangeFile} />
      <img src="./images/image-error.png" alt="a" />
      <button popovertarget="popover">popover</button>

      <div popover="true" id="popover">
        hello
        <button popovertarget="popover">popover</button>
      </div>
    </>
  );
}

export default DownloadPage;
