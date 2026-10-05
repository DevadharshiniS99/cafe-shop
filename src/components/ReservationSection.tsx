import React, { useState } from 'react';
import { ReservationData } from '../types/cafe';
import { Calendar, Users, Clock, CheckCircle2, MapPin, Sparkles } from 'lucide-react';

interface ReservationSectionProps {
  onReservationComplete?: (res: ReservationData) => void;
}

const SEATING_OPTIONS: { id: ReservationData['seatingArea']; label: string; desc: string }[] = [
  { id: 'Sunlit Atrium', label: 'Sunlit Atrium', desc: 'Overhead glass skylight, ficus trees, and natural morning light.' },
  { id: 'Barista Counter', label: 'Barista Bar Counter', desc: 'Front-row seat to manual pour-overs, Slayer espresso pulls, and coffee talk.' },
  { id: 'Garden Patio', label: 'Garden Patio', desc: 'Brick-walled courtyard with heated pergolas and seasonal flora.' },
  { id: 'Quiet Reading Nook', label: 'Quiet Reading Nook', desc: 'Deep leather armchairs, low tables, and analog vinyl acoustics.' },
];

const TIME_SLOTS = [
  '08:00 AM', '09:00 AM', '10:00 AM', '11:15 AM',
  '12:30 PM', '01:45 PM', '03:00 PM', '04:15 PM', '05:30 PM',
];

export const ReservationSection: React.FC<ReservationSectionProps> = ({
  onReservationComplete,
}) => {
  // Default to tomorrow's date or today
  const todayStr = new Date().toISOString().split('T')[0];

  const [date, setDate] = useState(todayStr);
  const [timeSlot, setTimeSlot] = useState('10:00 AM');
  const [partySize, setPartySize] = useState(2);
  const [seatingArea, setSeatingArea] = useState<ReservationData['seatingArea']>('Sunlit Atrium');
  const [guestName, setGuestName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  const [confirmedReservation, setConfirmedReservation] = useState<ReservationData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newReservation: ReservationData = {
        id: `res-${Date.now()}`,
        guestName,
        email,
        phone,
        partySize,
        date,
        timeSlot,
        seatingArea,
        specialRequests,
        referenceCode: `ATL-RES-${Math.floor(1000 + Math.random() * 9000)}`,
        createdAt: new Date().toISOString(),
      };

      setConfirmedReservation(newReservation);
      setIsSubmitting(false);
      if (onReservationComplete) {
        onReservationComplete(newReservation);
      }
    }, 600);
  };

  const handleBookAnother = () => {
    setConfirmedReservation(null);
    setSpecialRequests('');
  };

  return (
    <section id="reservations" className="py-16 lg:py-24 bg-white border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-12">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#A06D3B]">
            Gather & Linger
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 [text-wrap:balance]">
            Table Reservations & Cupping Sessions
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            Reserve a table in our sunlit atrium or courtyard for artisan brunch, barista flights, or intimate afternoon coffee meetings. Walk-ins are always welcome at our front espresso bar.
          </p>
        </div>

        {confirmedReservation ? (
          /* Confirmation Ticket Display */
          <div className="max-w-xl mx-auto bg-[#FAF8F5] border border-stone-300 rounded-xl p-6 sm:p-8 shadow-sm space-y-6 text-center animate-in fade-in duration-300">
            <div className="w-16 h-16 bg-stone-900 text-amber-200 rounded-full flex items-center justify-center mx-auto ring-8 ring-stone-100">
              <Sparkles className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                Reservation Confirmed
              </span>
              <h3 className="font-serif text-2xl font-semibold text-stone-900">
                We look forward to hosting you, {confirmedReservation.guestName}
              </h3>
              <p className="text-xs text-stone-600">
                A confirmation summary has been logged for our host stand.
              </p>
            </div>

            {/* Ticket details */}
            <div className="bg-white p-5 rounded-lg border border-stone-200 text-left space-y-3">
              <div className="flex justify-between items-center text-xs pb-2 border-b border-stone-100">
                <span className="text-stone-500">Reservation Reference</span>
                <span className="font-mono font-bold text-stone-900">
                  {confirmedReservation.referenceCode}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs pb-2 border-b border-stone-100">
                <span className="text-stone-500">Date & Time</span>
                <span className="font-medium text-stone-900">
                  {confirmedReservation.date} at {confirmedReservation.timeSlot}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs pb-2 border-b border-stone-100">
                <span className="text-stone-500">Guests & Atmosphere</span>
                <span className="font-medium text-stone-900">
                  {confirmedReservation.partySize} Guests · {confirmedReservation.seatingArea}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-stone-500">Host Location</span>
                <span className="font-medium text-stone-900">42 Mercer Street, Soho</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                onClick={handleBookAnother}
                className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-stone-800 bg-stone-200 hover:bg-stone-300 rounded-md transition-colors"
              >
                Book Another Table
              </button>
              <a
                href="#menu"
                className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-stone-900 hover:bg-stone-800 rounded-md transition-colors"
              >
                Pre-Select Food & Coffee
              </a>
            </div>
          </div>
        ) : (
          /* Booking Form */
          <form
            onSubmit={handleSubmit}
            className="max-w-3xl mx-auto bg-[#FAF8F5] border border-stone-300/80 rounded-xl p-6 sm:p-10 shadow-sm space-y-8"
          >
            {/* Step 1: Party, Date, Time */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-700 pb-2 border-b border-stone-200">
                1. Select Schedule & Party Size
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Party Size */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-stone-700 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-stone-500" />
                    Party Size
                  </label>
                  <select
                    value={partySize}
                    onChange={(e) => setPartySize(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded focus:ring-1 focus:ring-stone-900 focus:border-stone-900 text-stone-900"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date Picker */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-stone-700 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-stone-500" />
                    Reservation Date
                  </label>
                  <input
                    type="date"
                    min={todayStr}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded focus:ring-1 focus:ring-stone-900 focus:border-stone-900 text-stone-900"
                    required
                  />
                </div>

                {/* Time Slot */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-stone-700 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-stone-500" />
                    Preferred Time
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded focus:ring-1 focus:ring-stone-900 focus:border-stone-900 text-stone-900"
                  >
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Step 2: Seating Area Selection */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-700 pb-2 border-b border-stone-200">
                2. Choose Seating Atmosphere
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SEATING_OPTIONS.map((area) => {
                  const isSelected = seatingArea === area.id;
                  return (
                    <div
                      key={area.id}
                      onClick={() => setSeatingArea(area.id)}
                      className={`p-4 rounded-lg border text-left cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-white border-stone-900 shadow-xs'
                          : 'bg-stone-50/60 border-stone-200 hover:border-stone-300 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-sm font-semibold text-stone-900">
                          {area.label}
                        </span>
                        <div
                          className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                            isSelected ? 'border-stone-900 bg-stone-900' : 'border-stone-300'
                          }`}
                        >
                          {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                        </div>
                      </div>
                      <p className="text-xs text-stone-500 mt-1 leading-relaxed">{area.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Guest Details */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-700 pb-2 border-b border-stone-200">
                3. Primary Guest Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-medium text-stone-600 block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Evelyn Vance"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded focus:ring-1 focus:ring-stone-900 focus:border-stone-900 text-stone-800"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-stone-600 block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="evelyn@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded focus:ring-1 focus:ring-stone-900 focus:border-stone-900 text-stone-800"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-stone-600 block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="(212) 555-0190"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded focus:ring-1 focus:ring-stone-900 focus:border-stone-900 text-stone-800"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-stone-600 block mb-1">Special Occasion or Notes</label>
                <input
                  type="text"
                  placeholder="e.g. Birthday brunch, high-chair needed, quiet corner for business coffee..."
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded focus:ring-1 focus:ring-stone-900 focus:border-stone-900 text-stone-800"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 text-xs font-semibold uppercase tracking-wider text-white bg-stone-900 hover:bg-stone-800 rounded-md transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isSubmitting ? (
                  <span>Securing Table...</span>
                ) : (
                  <>
                    <span>Confirm Table Reservation</span>
                  </>
                )}
              </button>
              <p className="text-[11px] text-center text-stone-500 mt-2">
                No cancellation fees. We hold tables for 15 minutes past scheduled time.
              </p>
            </div>
          </form>
        )}

      </div>
    </section>
  );
};
