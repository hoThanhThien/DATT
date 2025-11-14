import './Footer.css';
import tiktokIcon from '../../assets/tiktok.svg';
import facebookIcon from '../../assets/facebook.png';
import zaloIcon from '../../assets/zalo.svg';
import youtubeIcon from '../../assets/youtube.svg';
import logo from '../../assets/logo/logo.png';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-left">
          <div className="footer-logo">
            <img src={logo} alt="MWI" className="footer-logo-img" />
          </div>
        </div>

        <div className="footer-middle">
          <div className="footer-info-block">
            <h4 className="footer-info-title">GIỜ LÀM VIỆC</h4>
            <p className="footer-info-text">Thứ 2 - Thứ 7: 8:00 sáng - 7:00 tối</p>
            <p className="footer-info-text">CHỦ NHẬT: 8h sáng - ...</p>
          </div>
        </div>

        <div className="footer-right">
          <div className="footer-info-block">
            <h4 className="footer-info-title">THÔNG TIN PHÒNG KHÁM</h4>
            <p className="footer-info-text">ĐT: 028 38 XXX XXX - 0787 XXX XXX</p>
            <p className="footer-info-text">Email: info@UTH.com.vn</p>
            <p className="footer-info-text">Địa chỉ: 02 Võ Oanh, Phường 25, Bình Thạnh, Thành phố Hồ Chí Minh</p>
          </div>
        </div>

        <div className="footer-social">
          <div className="footer-info-block">
            <h4 className="footer-info-title">THEO DÕI CHÚNG TÔI</h4>
            <div className="social-links">
              <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                <img src={tiktokIcon} alt="TikTok" />
                Tiktok
              </a>
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <img src={facebookIcon} alt="Facebook" />
                Facebook
              </a>
              <a href="https://zalo.me/" target="_blank" rel="noopener noreferrer" aria-label="Zalo">
                <img src={zaloIcon} alt="Zalo" />
                Zalo
              </a>
              <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <img src={youtubeIcon} alt="YouTube" />
                Youtube
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
