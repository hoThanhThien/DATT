import { Link } from 'react-router-dom';
import './HomePage.css';
import Card from '../../components/ui/Card';
import Footer from '../../components/layout/Footer';
import HeroBookingCard from '../../components/hero/HeroBookingCard';

const featureCards = [
	{
		title: 'Đặt lịch khám nhanh chóng',
		description: 'Đặt lịch trực tuyến, theo dõi trạng thái và nhận thông báo lịch hẹn mọi lúc.',
		icon: '📅',
	},
	{
		title: 'Khám từ xa trong 1 chạm',
		description: 'Trò chuyện video bảo mật với bác sĩ thông qua phiên khám tiêu chuẩn y tế.',
		icon: '🎥',
	},
	{
		title: 'Hồ sơ & toa thuốc điện tử',
		description: 'Lưu trữ bệnh án, toa thuốc, kết quả xét nghiệm tập trung và truy cập tức thì.',
		icon: '📄',
	},
	{
		title: 'Thanh toán linh hoạt',
		description: 'Hỗ trợ nhiều phương thức thanh toán, bảo hiểm và theo dõi hoá đơn minh bạch.',
		icon: '💳',
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
						Kết nối bệnh nhân, bác sĩ và bệnh viện <span>mọi lúc - mọi nơi</span>
					</h1>

					{/* Search bar like Medpro */}
					<div className="hero-search">
						<input type="search" placeholder="Tìm kiếm bác sĩ, bệnh viện, chuyên khoa..." />
					</div>
					<p>
						Từ đặt lịch, khám video, đến theo dõi bệnh án và thanh toán, tất cả hợp nhất trên một hệ
						thống duy nhất tích hợp chuẩn y tế của MedPro.
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

			<section className="feature-grid">
							{featureCards.map((feature) => (
								<Card key={feature.title} title={feature.title} icon={feature.icon}>
									<p>{feature.description}</p>
								</Card>
							))}
			</section>

			<section className="workflow">
				<div className="workflow-header">
					<h2>Quy trình kết nối chăm sóc toàn diện</h2>
					<p>
						Liên kết các mô-đun Lịch khám, Hồ sơ bệnh án, Phiên video và Thanh toán như sơ đồ dữ liệu
						bạn đã gửi.
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

			<Footer />

			<section className="testimonials">
				<div className="testimonials-header">
					<h2>Hơn 200.000 người dùng đang tin tưởng</h2>
					<p>Giải pháp giúp bệnh nhân yên tâm điều trị và bác sĩ quản lý hồ sơ hiệu quả.</p>
				</div>
				<div className="testimonial-list">
					{testimonials.map((testimonial) => (
						<blockquote key={testimonial.name}>
							<p>“{testimonial.quote}”</p>
							<footer>
								<strong>{testimonial.name}</strong>
								<span>{testimonial.role}</span>
							</footer>
						</blockquote>
					))}
				</div>
			</section>

			<section className="cta-section">
				<div className="cta-card">
					<h2>Bắt đầu trải nghiệm Telemedicine chuẩn MedPro</h2>
					<p>
						Đăng ký tài khoản ngay hôm nay để khai thác đầy đủ các mô-đun Quản lý bệnh nhân, Lịch khám,
						Hồ sơ và Thanh toán điện tử.
					</p>
					<div className="cta-actions">
						<Link to="/register" className="btn primary">
							Tạo tài khoản miễn phí
						</Link>
						<Link to="/contact" className="btn outline">
							Liên hệ tư vấn giải pháp
						</Link>
					</div>
					{/* TODO: Thêm liên kết tải app mobile khi có */}
				</div>
			</section>
		</div>
	);
};

export default HomePage;