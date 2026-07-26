import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import HospitalTour from './components/HospitalTour';
import SymptomTriage from './components/SymptomTriage';
import DoctorsRoster from './components/DoctorsRoster';
import Departments from './components/Departments';
import PatientTestimonials from './components/PatientTestimonials';
import CheckupAndInsurance from './components/CheckupAndInsurance';
import CampusLocator from './components/CampusLocator';
import CallbackModal from './components/CallbackModal';
import EmergencySection from './components/EmergencySection';
import Footer from './components/Footer';
import AppointmentWizard from './components/AppointmentWizard';
import TelehealthModal from './components/TelehealthModal';
import PatientPortal from './components/PatientPortal';
import AIChatWidget from './components/AIChatWidget';

export default function App() {
  const [lang, setLang] = useState('tr');
  const [theme, setTheme] = useState('dark');
  
  const [isAppointmentWizardOpen, setIsAppointmentWizardOpen] = useState(false);
  const [isPatientPortalOpen, setIsPatientPortalOpen] = useState(false);
  const [isTelehealthOpen, setIsTelehealthOpen] = useState(false);

  const [preSelectedDoctor, setPreSelectedDoctor] = useState(null);
  const [preSelectedDept, setPreSelectedDept] = useState(null);

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light-theme');
    } else {
      document.documentElement.classList.remove('light-theme');
    }
  }, [theme]);

  const handleOpenAppointment = () => {
    setPreSelectedDoctor(null);
    setPreSelectedDept(null);
    setIsAppointmentWizardOpen(true);
  };

  const handleSelectDoctorForBooking = (doctor) => {
    setPreSelectedDoctor(doctor);
    setPreSelectedDept(doctor.departmentId);
    setIsAppointmentWizardOpen(true);
  };

  const handleSelectDeptForBooking = (deptId) => {
    setPreSelectedDoctor(null);
    setPreSelectedDept(deptId);
    setIsAppointmentWizardOpen(true);
  };

  const handleScrollToTriage = () => {
    const element = document.getElementById('triage');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1329] text-slate-100 selection:bg-cyan-500 selection:text-slate-950 font-sans">
      
      {/* Navigation Header */}
      <Header 
        lang={lang}
        setLang={setLang}
        theme={theme}
        setTheme={setTheme}
        onOpenAppointment={handleOpenAppointment}
        onOpenPatientPortal={() => setIsPatientPortalOpen(true)}
        onOpenTelehealth={() => setIsTelehealthOpen(true)}
      />

      {/* Hero Section */}
      <Hero 
        lang={lang}
        onOpenAppointment={handleOpenAppointment}
        onOpenPatientPortal={() => setIsPatientPortalOpen(true)}
        onOpenTelehealth={() => setIsTelehealthOpen(true)}
        onScrollToTriage={handleScrollToTriage}
      />

      {/* 360° Interactive Hospital Tour & Facility Gallery */}
      <HospitalTour 
        lang={lang}
      />

      {/* AI Symptom Triage Component */}
      <SymptomTriage 
        lang={lang}
        onSelectDoctorForBooking={handleSelectDoctorForBooking}
      />

      {/* Medical Departments & Clinics Showcase */}
      <Departments 
        lang={lang}
        onSelectDeptForBooking={handleSelectDeptForBooking}
      />

      {/* Doctor Roster & Specialist Profiles */}
      <DoctorsRoster 
        lang={lang}
        onSelectDoctorForBooking={handleSelectDoctorForBooking}
      />

      {/* NEW: Patient Stories & Video Testimonials */}
      <PatientTestimonials 
        lang={lang}
      />

      {/* VIP Checkup Packages & Insurance Verifier */}
      <CheckupAndInsurance 
        lang={lang}
        onOpenAppointment={handleOpenAppointment}
      />

      {/* NEW: Multi-Location / Campus Locator */}
      <CampusLocator 
        lang={lang}
      />

      {/* NEW: 1-Click Fast Callback Request */}
      <CallbackModal 
        lang={lang}
      />

      {/* 24/7 Emergency & Urgent Care Unit */}
      <EmergencySection 
        lang={lang}
      />

      {/* Footer */}
      <Footer 
        lang={lang}
        onOpenAppointment={handleOpenAppointment}
        onOpenPatientPortal={() => setIsPatientPortalOpen(true)}
      />

      {/* Floating AI Assistant Chat Widget */}
      <AIChatWidget 
        lang={lang}
        onOpenAppointment={handleOpenAppointment}
        onOpenPatientPortal={() => setIsPatientPortalOpen(true)}
      />

      {/* Modal 1: Interactive Appointment Wizard */}
      <AppointmentWizard 
        lang={lang}
        isOpen={isAppointmentWizardOpen}
        onClose={() => {
          setIsAppointmentWizardOpen(false);
          setPreSelectedDoctor(null);
          setPreSelectedDept(null);
        }}
        preSelectedDoctor={preSelectedDoctor}
        preSelectedDept={preSelectedDept}
      />

      {/* Modal 2: Online Telehealth Consultation Simulator */}
      <TelehealthModal 
        lang={lang}
        isOpen={isTelehealthOpen}
        onClose={() => setIsTelehealthOpen(false)}
      />

      {/* Modal 3: Patient E-Results & Lab Report Portal */}
      <PatientPortal 
        lang={lang}
        isOpen={isPatientPortalOpen}
        onClose={() => setIsPatientPortalOpen(false)}
      />

    </div>
  );
}
