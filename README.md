# LiveEarningsTracker 💰

A real-time earnings tracker PWA that shows you exactly how much money you're making as you work. Perfect for hourly workers, freelancers, and anyone who wants to gamify their work experience!

## 🌟 Features

### 💵 Real-Time Earnings Tracking
- Live dollar-by-dollar updates while you're on the clock
- Gross and take-home pay calculations
- Multiple time period views (today, week, month, year, pay period)
- Satisfying "cha-ching" sound effects with haptic feedback

### 🎯 Goal Setting & Progress
- Set daily, weekly, and monthly earning goals
- Visual progress bars with celebrations when goals are reached
- Smart goal tracking that motivates you throughout the day

### 📊 Advanced Calculations
- **Overtime Support**: Automatically calculates overtime pay at 1.5x rate
- **Tax Calculations**: Federal, state, Social Security, and Medicare taxes
- **Deductions**: Custom deductions per pay period
- **Smart Scheduling**: Respects work hours, lunch breaks, and weekends

### 🔍 PDF Pay Stub Parsing
- Upload your pay stub PDF for automatic rate detection
- AI-powered parsing extracts hourly rate, tax rates, and deductions
- Supports multiple payroll formats (ADP, Workday, and more)
- One-click settings import from your actual pay data

### 📱 Progressive Web App (PWA)
- Install directly to your phone's home screen
- Works offline with cached data
- Native app-like experience
- Background sync capabilities

### ⚡ Performance Optimized
- Debounced updates for smooth performance
- Memoized calculations to prevent unnecessary re-renders
- Efficient time calculations with proper edge case handling

## 🚀 Quick Start

1. **Clone or Download**
   ```bash
   git clone https://github.com/adamorphic/LiveEarningsTracker.git
   ```

2. **Open in Browser**
   - Simply open `index.html` in any modern web browser
   - No build process required - it's pure HTML/JS/CSS!

3. **Set Up Your Profile**
   - Tap the gear icon to enter your hourly rate
   - Set your work schedule and tax rates
   - Optional: Upload a pay stub PDF for automatic setup

4. **Install as App** (Recommended)
   - Browser will prompt to "Add to Home Screen"
   - Or use the install button when it appears

## 📖 How to Use

### Initial Setup
1. **Configure Work Schedule**: Set your daily work hours and lunch break
2. **Set Hourly Rate**: Enter your gross hourly pay
3. **Tax Settings**: Enter your tax rates or let PDF parsing detect them
4. **Pay Period**: Set when your pay period starts and how long it is

### PDF Import Feature
1. Tap the "Choose PDF File" button in settings
2. Upload your most recent pay stub
3. The app will automatically detect:
   - Your hourly rate
   - Federal, state, Social Security, and Medicare tax rates
   - Other deductions (401k, insurance, etc.)
   - Pay period length
4. Review detected values and tap "Apply Values"

### Setting Goals
1. Tap the target icon in the header
2. Set daily, weekly, and monthly take-home goals
3. Watch your progress throughout the day

## 🎨 Screenshots

*Mobile-first design with iOS-inspired interface*

- **Real-time tracking**: See your money grow second by second
- **Goal progress**: Visual progress bars keep you motivated
- **Smart PDF parsing**: Upload pay stubs for instant setup
- **Comprehensive settings**: Fine-tune every aspect of your earnings

## 🔧 Technical Details

### Built With
- **Vanilla JavaScript** with React via CDN
- **Tailwind CSS** for styling
- **PDF.js** for pay stub parsing
- **Service Worker** for offline functionality
- **Web Audio API** for sound effects
- **Vibration API** for haptic feedback

### Browser Support
- ✅ Chrome 80+
- ✅ Safari 13+
- ✅ Firefox 75+
- ✅ Edge 80+

### Features by Browser
- **Sound Effects**: All modern browsers
- **Haptic Feedback**: Mobile browsers
- **PWA Install**: Chrome, Safari, Edge
- **PDF Parsing**: All modern browsers

## 🔮 Advanced Features

### Overtime Calculation
The app automatically detects when you've worked more than 8 hours (configurable) and calculates overtime at 1.5x your regular rate.

### Smart Tax Calculations
Supports all major tax types:
- Federal income tax
- State income tax  
- Social Security (6.2%)
- Medicare (1.45%)
- Custom deductions

### Performance Optimizations
- Debounced time updates prevent UI lag
- Memoized calculations only run when settings change
- Efficient date range calculations
- Smart PDF parsing with validation

## 📱 PWA Installation

### iOS (Safari)
1. Open the app in Safari
2. Tap the Share button
3. Scroll down and tap "Add to Home Screen"
4. Tap "Add"

### Android (Chrome)
1. Open the app in Chrome
2. Tap the three dots menu
3. Tap "Add to Home screen"
4. Tap "Add"

### Desktop
1. Look for the install icon in your browser's address bar
2. Or check your browser menu for "Install app"

## 🎯 Use Cases

- **Hourly Workers**: Track exactly how much you've earned during your shift
- **Freelancers**: Monitor project earnings in real-time
- **Students**: Gamify part-time work to stay motivated
- **Goal Setting**: Visual progress toward daily/weekly earning targets
- **Tax Planning**: See real-time impact of taxes on your earnings

## 🔐 Privacy & Data

- **100% Local**: All data stored locally on your device
- **No Tracking**: No analytics, ads, or data collection
- **Offline First**: Works without internet connection
- **PDF Processing**: PDFs are processed locally, never uploaded

## 🛠️ Development

### Local Development
1. Clone the repository
2. Open `index.html` in a web browser
3. Make changes and refresh to see updates

### File Structure
```
LiveEarningsTracker/
├── index.html          # Main app file
├── manifest.json       # PWA configuration
├── sw.js              # Service worker
├── README.md          # This file
└── icons/             # App icons
```

### Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - feel free to use this for personal or commercial projects!

## 🙋‍♂️ Support

If you encounter any issues or have feature requests:
1. Check the browser console for error messages
2. Ensure you're using a modern browser
3. Try clearing your browser cache
4. Open an issue on GitHub

---

**Made with ❤️ for workers everywhere**

*Turn your work time into a game - watch your money grow in real-time!*
