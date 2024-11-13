// import { Cloudinary } from '@cloudinary/url-gen';
// import { auto } from '@cloudinary/url-gen/actions/resize';
// import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
// //import { AdvancedImage } from '@cloudinary/react';

function DownloadPage() {
  // const cld = new Cloudinary({ cloud: { cloudName: 'dmbmugbvi' } });

  // Use this sample image or upload your own via the Media Explorer
  // const img = cld
  //   .image('ysjm7ie6ghbmuywbvg95')
  //   .format('auto') // Optimize delivery by resizing and applying auto-format and auto-quality
  //   .quality('auto')
  //   .resize(auto().gravity(autoGravity()).width(500).height(500)); // Transform the image: auto-crop to square aspect_ratio
  //<AdvancedImage cldImg={img} />;
  return (
    <>
      <video src="/video/video.mp4" controls></video>
      <a href="/video/video.mp4">tai xuong</a>
    </>
  );
}

export default DownloadPage;
