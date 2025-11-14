import { Link } from 'react-router-dom';
import './HomePage.css';
import Card from '../../components/ui/Card';
import Footer from '../../components/layout/Footer';
import HeroBookingCard from '../../components/hero/HeroBookingCard';
import doctor1 from '../../assets/doctors/doctor-1.png';
import doctor2 from '../../assets/doctors/doctor-2.png';
import doctor3 from '../../assets/doctors/doctor-3.png';
import doctor4 from '../../assets/doctors/doctor-4.png';

const featureCards = [
	{
		title: 'Tầm soát - Phòng ngừa',
		description: 'Kiểm tra sức khỏe định kỳ và phát hiện sớm các bệnh lý.',
		icon: '🔍',
	},
	{
		title: 'Phục hồi - Nâng cao sức khỏe',
		description: 'Hỗ trợ phục hồi chức năng và cải thiện chất lượng sống toàn diện.',
		icon: '💪',
	},
	{
		title: 'Khám video bảo mật',
		description: 'Trò chuyện trực tuyến với bác sĩ chuyên khoa theo tiêu chuẩn y tế.',
		icon: '🎥',
	},
	{
		title: 'Hồ sơ bệnh án điện tử',
		description: 'Quản lý toàn bộ toa thuốc, xét nghiệm và lịch sử khám trực tuyến.',
		icon: '📋',
	},
];

const doctors = [
	{
		id: 1,
		name: 'BS. Cao Quốc Hùng',
		specialty: 'Chuyên khoa Tim mạch',
		image: doctor1,
	},
	{
		id: 2,
		name: 'BS. Nguyễn Việt Thành',
		specialty: 'Chuyên khoa Nội tổng quát',
		image: doctor2,
	},
	{
		id: 3,
		name: 'BS. Nguyễn Thị Diễm Lệ',
		specialty: 'Chuyên khoa Sản - Phụ khoa',
		image: doctor3,
	},
	{
		id: 4,
		name: 'BS. Nguyễn Thị Thu Trúc',
		specialty: 'Chuyên khoa Nhi khoa',
		image: doctor4,
	},
];

const workflowSteps = [
	{
		step: '01',
		title: 'Chọn bác sĩ & chuyên khoa',
		description: 'Tìm kiếm theo chuyên môn, lịch làm việc và hồ sơ đánh giá.',
	},
	{
		step: '02',
		title: 'Đặt lịch & thanh toán',
		description: 'Xác nhận lịch video hoặc khám trực tiếp, thanh toán bảo mật.',
	},
	{
		step: '03',
		title: 'Tham gia phiên khám',
		description: 'Nhận nhắc lịch, tham gia phòng khám trực tuyến đúng giờ.',
	},
	{
		step: '04',
		title: 'Theo dõi sau khám',
		description: 'Nhận toa thuốc, theo dõi tiến trình điều trị và nhắc lịch tái khám.',
	},
];

const testimonials = [
	{
		name: 'Nguyễn Thị Lan',
		role: 'Bệnh nhân tuyến tỉnh',
		quote:
			'Tôi có thể đặt lịch và khám từ xa với bác sĩ chuyên khoa ngay trong ngày. Hồ sơ bệnh án được lưu trữ đầy đủ, rất tiện lợi.',
	},
	{
		name: 'BS. Trần Minh Khoa',
		role: 'Bác sĩ nội tổng quát',
		quote:
			'Quy trình tiếp nhận và chăm sóc bệnh nhân được chuẩn hoá, giúp tôi tập trung vào điều trị và theo dõi hiệu quả hơn.',
	},
];

const HomePage = () => {
	return (
		<div className="home-page">
			<section className="hero">
				<div className="hero-content">
					<span className="hero-label">Nền tảng Telemedicine thế hệ mới</span>
					<h1>
						<span className="hero-highlight">Kết nối bệnh nhân, bác sĩ và bệnh viện</span>
						<br />
						<span className="hero-sub">Mọi lúc - mọi nơi</span>
					</h1>
					<div className="hero-search">
						<input type="search" placeholder="Tìm kiếm bác sĩ, bệnh viện, chuyên khoa..." />
					</div>
					<p className="hero-desc">
						Đặt lịch, khám video, quản lý bệnh án và thanh toán online – tất cả trên một nền tảng duy nhất chuẩn y tế.
					</p>
					<div className="hero-actions">
						<Link to="/login" className="btn primary">
							Đăng nhập
						</Link>
						<Link to="/register" className="btn outline">
							Đăng ký tài khoản
						</Link>
					</div>
				</div>
				<HeroBookingCard />
			</section>

			<section className="about-section">
				<div className="about-header">
					<span className="about-label">VỀ CHÚNG TÔI</span>
					<h2>CHUYÊN MÔN Y TẾ VÀ CHĂM SÓC SỨC KHỎE</h2>
					<p>Chúng tôi cung cấp dịch vụ y tế chuyên môn toàn diện với các bác sĩ giàu kinh nghiệm, đảm bảo chất lượng chăm sóc sức khỏe tốt nhất cho mọi bệnh nhân.</p>
				</div>
				<Link to="/doctors" className="btn primary">ĐỌC THÊM</Link>
			</section>

			<section className="doctors-section">
				<h2 className="doctors-title">CHUYÊN GIA CỦA CHÚNG TÔI</h2>
				<div className="doctors-grid">
					{doctors.map((doctor) => (
						<div className="doctor-card" key={doctor.id}>
							<img src={doctor.image} alt={doctor.name} className="doctor-avatar" />
							<h4>{doctor.name}</h4>
							<p>{doctor.specialty}</p>
						</div>
					))}
				</div>
			</section>

			<section className="feature-grid">
				{featureCards.map((feature) => (
					<div className="feature-card" key={feature.title}>
						<div className="feature-icon">{feature.icon}</div>
						<h3>{feature.title}</h3>
						<p>{feature.description}</p>
					</div>
				))}
			</section>

			<section className="workflow">
				<div className="workflow-header">
					<h2>Quy trình kết nối chăm sóc toàn diện</h2>
					<p>
						Liên kết các mô-đun Lịch khám, Hồ sơ bệnh án, Phiên video và Thanh toán như sơ đồ dữ liệu bạn đã gửi.
					</p>
				</div>
				<div className="workflow-steps">
					{workflowSteps.map((step) => (
						<div className="workflow-step" key={step.step}>
							<span className="step-number">{step.step}</span>
							<h4>{step.title}</h4>
							<p>{step.description}</p>
						</div>
					))}
				</div>
			</section>

			<section className="testimonials">
				<h2 className="testimonials-title">Cảm nhận từ người dùng</h2>
				<div className="testimonials-list">
					{testimonials.map((t) => (
						<div className="testimonial-card" key={t.name}>
							<div className="testimonial-quote">“{t.quote}”</div>
							<div className="testimonial-user">
								<strong>{t.name}</strong> <span>- {t.role}</span>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* CTA Section */}
			<section className="registration-section">
				<h2 className="registration-title">ĐĂNG KÝ KHÁM</h2>
				<p className="registration-subtitle">Hãy điền thông tin để chúng tôi liên hệ và tư vấn phương án khám phù hợp với bạn</p>
				<form className="registration-form" onSubmit={(e) => e.preventDefault()}>
					<div className="form-row">
						<input type="text" placeholder="Họ và tên" required />
						<input type="email" placeholder="Email" required />
					</div>
					<div className="form-row">
						<input type="tel" placeholder="Ngày sinh" required />
						<input type="tel" placeholder="Số điện thoại" required />
					</div>
					<div className="form-row">
						<select required>
							<option value="">Khám online</option>
							<option value="online">Khám online</option>
							<option value="offline">Khám trực tiếp</option>
						</select>
						<select required>
							<option value="">Khám tại cơ sở</option>
							<option value="home">Tại nhà</option>
							<option value="center">Tại trung tâm y tế</option>
						</select>
					</div>
					<input type="text" placeholder="Bác sĩ" style={{width: '100%'}} required />
					<textarea placeholder="Triệu chứng" rows="4"></textarea>
					<button type="submit" className="btn primary">GỬI YÊU CẦU</button>
				</form>
			</section>

			<section className="cta-section">
				<div className="cta-card">
					<h2>Bắt đầu trải nghiệm dịch vụ y tế trực tuyến</h2>
					<p>
						Đăng ký tài khoản ngay hôm nay để khai thác đầy đủ các dịch vụ khám, quản lý bệnh án,
						hồ sơ và thanh toán điện tử.
					</p>
					<div className="cta-actions">
						<Link to="/register" className="btn primary">
							Tạo tài khoản miễn phí
						</Link>
						<Link to="/contact" className="btn outline">
							Liên hệ tư vấn
						</Link>
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
};

export default HomePage;