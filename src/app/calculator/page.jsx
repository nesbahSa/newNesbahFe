'use client'

import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { Gradient, GradientBackground } from '@/components/gradient'
import { Navbar } from '@/components/navbar'
import { Heading, Lead, Subheading } from '@/components/text'
import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { CheckIcon } from '@heroicons/react/24/solid'



const objective = [
    {id: 'manual', title: 'اعرف مبلغ التمويل واريد رؤية افضل الخيارات'},
    {id: 'auto', title: 'معرفة الحد الاقصى للتمويل'},
]

const employmentStatus = [
    {id: 'employee', title: 'موظف'},
    {id: 'retiree', title: 'متقاعد'},
]

const loanType = [
    {id: 'personal', title: 'التمويل الشخصي'},
    {id: 'house', title: 'التمويل العقاري'},
]

const homeTenor = [
    {id: '5', title: '5 سنين'},
    {id: '10', title: '10 سنين'},
    {id: '15', title: '15 سنين'},
    {id: '20', title: '20 سنين'},
    {id: '25', title: '25 سنين'},
    {id: '30', title: '30 سنين'},
]

const personalTenor = [
    {id: '1', title: '1 سنين'},
    {id: '2', title: '2 سنين'},
    {id: '3', title: '3 سنين'},
    {id: '4', title: '4 سنين'},
    {id: '5', title: '5 سنين'},
]



function Header() {

    return (
        <div className="text-center">
            <Container className="mt-16">
                <Heading className="text-purple-950" as="h1">أكتشف خيارك</Heading>
                <h2 className="text-sm md:text-base mt-4 text-purple-950">
                    مع حاسبة نسبه، يمكنك معرفة خيارات التمويل الخاص بك بكل سهولة
                </h2>
            </Container>

            <div className="pb-1 pt-4 md:pt-7 md:pb-4">
                <div className="flex items-center justify-center gap-x-3 mt-10">
                    <p className="text-xs font-medium md:text-sm text-purple-800">
                        حالة السوق الحالية :
                    </p>
                <span className="inline-flex items-center gap-x-1.5 rounded-md bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                <svg viewBox="0 0 6 6" aria-hidden="true" className="size-1.5 fill-red-500">
                  <circle r={3} cx={3} cy={3} />
                </svg>
                مرتفعة
              </span>
                </div>
                <div className="flex items-center justify-center bg-white px-4 sm:px-6 lg:px-8">
                    <div className= "w-full max-w-md sm:max-w-lg lg:max-w-4xl px-4 pb-4 md:py-1 ">
                        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-2">
                            {/* Card 1: Total Subscribers */}
                            <div className="overflow-hidden rounded-lg bg-gray-50 px-2 py-3  md:px-2 md:py-4  shadow">
                                <p className="truncate py-1 text-sm font-normal text-purple-800">التمويل الشخصي</p>
                                <div className="py-2 grid grid-cols-2 items-start">
                                    <p className=" mt-3 text-sm font-normal text-purple-950">للقطاع الحكومي</p>
                                    <p className="mt-3  text-sm font-semibold text-purple-950">2.50%</p>
                                    <p className="mt-3  text-sm font-normal text-purple-950">للقطاع الخاص</p>
                                    <p className="mt-3 text-sm font-semibold text-purple-950">3.50%</p>
                                </div>
                            </div>

                            {/* Card 2: Avg. Open Rate */}
                            <div className="overflow-hidden rounded-lg bg-gray-50 px-2 py-3  md:px-2 md:py-4  shadow">
                                <p className="truncate py-1 text-sm font-normal text-purple-800">تمويل عقاري</p>
                                <div className="py-2 grid grid-cols-2 item-start">
                                    <p className="mt-3 text-sm font-normal text-purple-950">لمدة 15 سنة</p>
                                    <p className="mt-3 text-sm font-semibold text-purple-950">3.80%</p>
                                    <p className="mt-3 text-sm font-normal text-purple-950">لمدة 20 سنة</p>
                                    <p className="mt-3 text-sm font-semibold text-purple-950">4.20%</p>
                                    <p className="mt-3 text-sm font-normal text-purple-950">لمدة 25 سنة</p>
                                    <p className="mt-3 text-sm font-semibold text-purple-950">4.65%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


function CalculatorForm()  {
    const [selectedObjective, setSelectedObjective] = useState(null);
    const [selectedLoanType, setSelectedLoanType] = useState(null);
    const [selectedEmploymentStatus, setSelectedEmploymentStatus] = useState(null);
    const [manualForm, setShowManualForm] = useState(false);
    const [autoForm, setShowAutoForm] = useState(false);
    const [salary, setSalary] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [tenor, setTenor] = useState('');
    const [knownLoanAmount, setKnownLoanAmount] = useState('');
    const [results, setResults] = useState([]);
    const [isNextStepDisabled, setIsNextStepDisabled] = useState(false);
    const [currentStep, setCurrentStep] = useState(1); // Track the current step


    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(results); // Convert JSON data (results) to worksheet
        const workbook = XLSX.utils.book_new(); // Create a new workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, 'LoanCalculations'); // Append worksheet to workbook
        XLSX.writeFile(workbook, 'LoanCalculations.xlsx'); // Export as .xlsx file
    };

    const handleExportToExcel = () => {
        const table = document.getElementById('result-table'); // Ensure the table has an ID
        const wb = XLSX.utils.table_to_book(table);
        XLSX.writeFile(wb, 'loan-calculations.xlsx');
    };

    const handleObjectiveChange = (id) => {
        setSelectedObjective(id);
    };

    const handleLoanTypeChange = (id) => {
        setSelectedLoanType(id);
    };

    const handleEmploymentStatusChange = (id) => {
        setSelectedEmploymentStatus(id);
    };

    const steps = [
        { id: 'الخطوة ١', name: 'حالتك', href: '#', status: currentStep > 1 ? 'complete' : currentStep === 1 ? 'current' : 'upcoming' },
        { id: 'الخطوة ٢', name: 'تفاصيل بياناتك', href: '#', status: currentStep > 2 ? 'complete' : currentStep === 2 ? 'current' : 'upcoming' },
        { id: 'الخطوة ٣', name: 'النتيجة', href: '#', status: currentStep === 3 ? 'current' : 'upcoming' },
    ];

    const renderProgressBar = () => (

        <nav aria-label="Progress" className="mb-6 mt-1 ">
            <ol role="list" className="flex justify-center space-x-4 md:space-x-8">
                {steps.map((step, index) => (
                    <li key={step.id} className="flex-1 ml-3 md:ml-8">
                        {step.status === 'complete' ? (
                            <a
                                href="#"
                                onClick={() => {
                                    if (currentStep === 2 && index === 0) {
                                        setCurrentStep(1); // Allow going back to Step 1 from Step 2
                                        setShowManualForm(false);
                                        setShowAutoForm(false);
                                    }
                                }}
                                className="group flex flex-col border-b-4 border-purple-900 py-2 hover:border-indigo-800"
                            >
                                <span className="text-xs font-medium text-purple-900 group-hover:text-indigo-800">{step.id}</span>
                                <span className="text-xs md:text-sm font-medium">{step.name}</span>
                            </a>
                        ) : step.status === 'current' ? (
                            <a
                                href="#"
                                aria-current="step"
                                className="flex flex-col items-center md:items-start border-b-4 border-purple-900 py-2 mr-3 md:mr-6"
                            >
                                <span className="text-xs font-medium text-purple-900">{step.id}</span>
                                <span className="text-xs md:text-sm font-medium">{step.name}</span>
                            </a>
                        ) : (
                            <a
                                href="#"
                                className="group flex flex-col items-center md:items-start border-b-4 border-gray-200 py-2 hover:border-gray-300"
                            >
                                <span className="text-xs font-medium text-gray-500 group-hover:text-gray-700">{step.id}</span>
                                <span className="text-xs md:text-sm font-medium">{step.name}</span>
                            </a>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );





    const handleNextStep = (event) => {
        event.preventDefault();

        // Ensure all fields are reset before moving to the next step
        setSalary('');
        setInterestRate('');
        setKnownLoanAmount('');
        setResults([]);

        // Check Step 1 conditions
        if (currentStep === 1) {
            if (selectedObjective === 'manual' && selectedLoanType != null && selectedEmploymentStatus != null) {
                setShowManualForm(true); // Display manual form for Step 2
                setCurrentStep(2); // Move to Step 2
            } else if (selectedObjective === 'auto' && selectedLoanType != null && selectedEmploymentStatus != null) {
                setShowAutoForm(true); // Display auto form for Step 2
                setCurrentStep(2); // Move to Step 2
            } else {
                alert('Please fill all the required fields before proceeding.');
            }
            return;
        }

        // Check Step 2 conditions
        if (currentStep === 2) {
            if ((manualForm && salary && interestRate) || (autoForm && knownLoanAmount && interestRate)) {
                setCurrentStep(3); // Move to Step 3
            } else {
                alert('Please complete the form to see the results.');
            }
        }
    };


    const tenorOptions = selectedLoanType === 'house' ? homeTenor : personalTenor;

    const handleResetCalculation = () => {
        setSalary('');
        setInterestRate('');
        setKnownLoanAmount('');
        setTenor('');
        setIsNextStepDisabled(true)
    };

    const handleManualCalculation = (event) => {
        event.preventDefault();

        if (!salary || !interestRate) {
            alert("Please fill in all required field.");
            return; // Stop further execution
        }

        const inputData = {
            salary: parseFloat(salary),
            interestRate: parseFloat(interestRate),
            selectedLoanType,
            selectedEmploymentStatus,
        };

        try {
            const allTenorResults = ManualCalculation(inputData);
            setResults(allTenorResults);
            setIsNextStepDisabled(true);
        } catch (error) {
            console.error(error.message);
            alert("An error occurred during calculation. Please check your inputs.");
        }
    };

    const handleAutoCalculation = (event) => {
        event.preventDefault();
        const inputData = {
            knownLoanAmount: parseFloat(knownLoanAmount),
            interestRate: parseFloat(interestRate),
            selectedLoanType,
            selectedEmploymentStatus,
        };

        try {
            const allTenorResults = AutoCalculation(inputData);
            setResults(allTenorResults);
            setIsNextStepDisabled(true);
        } catch (error) {
            console.error(error.message);
            alert("An error occurred during calculation. Please check your inputs.");
        }
    };

    const handleReset = () => {
        setSelectedObjective(null);
        setSelectedLoanType(null);
        setSelectedEmploymentStatus(null);
        setKnownLoanAmount(null);
            setSalary(null);
            setInterestRate(null);
        setShowManualForm(false);
        setShowAutoForm(false);
        setIsNextStepDisabled(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-white pb-16 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md sm:max-w-lg lg:max-w-4xl px-4 py-6 sm:py-10 ">
                {renderProgressBar()}
                <form className="space-y-6 mt-16">
                        {/* Step 1 Card */}
                    {currentStep === 1 &&(
                        <div className="overflow-hidden rounded-2xl bg-gray-50 shadow max-w-4xl mx-auto mb-6">
                            <div className="px-4 py-5 sm:px-6 text-center" style={{
                                background: 'linear-gradient(87.69deg, #1E1851 -9.53%, #4436B7 89.33%)',
                            }}>
                                <h2 className="text-base md:text-lg font-semibold text-white">تعرف على خيارك</h2>
                                <p className="mt-1 text-xs md:text-sm text-white">
                                    سيتم عرض معلومات التمويل بشكل تقريبي
                                </p>
                            </div>
                            <div className="items-center px-4 py-5 sm:p-6">
                                {/* Objective Fieldset */}
                                <fieldset>
                                    <div className="mt-6 grid sm:grid-cols-3 gap-4 px-4">
                                        <legend className="text-sm font-semibold text-purple-950">طريقة الاحتساب؟</legend>
                                        {objective.map((objective) => (

                                            <div className="flex flex-col gap-y-4">
                                                <div key={objective.id} className="flex items-start">
                                                    <input
                                                        id={objective.id}
                                                        name="objective-method"
                                                        type="radio"
                                                        value={objective.id}
                                                        className="size-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 gap-2"
                                                        checked={selectedObjective === objective.id}
                                                        onChange={() => handleObjectiveChange(objective.id)}

                                                    />
                                                    <label
                                                        htmlFor={objective.id}
                                                        className="mr-3 text-sm font-medium text-purple-800"
                                                    >
                                                        {objective.title}
                                                    </label>
                                                </div>
                                            </div>

                                        ))}
                                    </div>
                                </fieldset>
                                {/* Loan Type Fieldset */}
                                <fieldset>
                                    <div className="mt-8 grid sm:grid-cols-3 gap-4 px-4">
                                        <legend className="text-sm font-semibold text-purple-950">ما نوع التمويل؟</legend>
                                        {loanType.map((loan) => (
                                            <div className="flex flex-col gap-y-4">
                                                <div key={loan.id} className="flex items-start">
                                                    <input
                                                        id={loan.id}
                                                        name="loanType"
                                                        type="radio"
                                                        value={loan.id}
                                                        className="size-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 gap-4"
                                                        checked={selectedLoanType === loan.id}
                                                        onChange={() => handleLoanTypeChange(loan.id)}
                                                    />
                                                    <label
                                                        htmlFor={loan.id}
                                                        className="mr-3 text-sm font-medium text-purple-800"
                                                    >
                                                        {loan.title}
                                                    </label>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </fieldset>

                                {/* Employment Status Fieldset */}
                                <fieldset>
                                    <div className="mt-8  grid sm:grid-cols-3 gap-4 px-4">
                                        <legend className="text-sm font-semibold text-purple-950">
                                            ما هي حالتك الوظيفية؟
                                        </legend>
                                        {employmentStatus.map((status) => (
                                            <div key={status.id} className="flex items-start">
                                                <input
                                                    id={status.id}
                                                    name="employmentStatus"
                                                    type="radio"
                                                    value={status.id}
                                                    className="size-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 gap-4"
                                                    checked={selectedEmploymentStatus === status.id}
                                                    onChange={() => handleEmploymentStatusChange(status.id)}
                                                />
                                                <label
                                                    htmlFor={status.id}
                                                    className="mr-3 text-sm font-medium text-purple-800"
                                                >
                                                    {status.title}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </fieldset>
                            </div>
                            <div className="flex items-center justify-center gap-x-6 gap-y-6 mt-6 mb-10">
                                <button
                                    type="submit"
                                    className={`rounded-md px-8 py-2 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
                            ${isNextStepDisabled ? 'bg-gray-400 text-gray-300 cursor-not-allowed' : 'bg-purple-950 text-white text-semibold hover:bg-purple-800 focus-visible:outline-indigo-600'}`}
                                    onClick={handleNextStep}
                                >
                                    الـتـالـي
                                </button>
                                <button
                                    type="button"
                                    className=" text-sm/6 font-semibold text-gray-900"
                                    onClick={handleReset}
                                >
                                    إعادة الإختيار
                                </button>
                            </div>
                        </div>
                    )}


                    {/* Conditional Rendering for Step 2 */}
                    {currentStep === 2 && (
                        <>
                            {manualForm && (
                                <div className="overflow-hidden rounded-2xl bg-gray-50 shadow max-w-4xl mx-auto mb-6">
                                    <div
                                        className="px-4 py-5 sm:px-6 text-center"
                                        style={{
                                            background: "linear-gradient(87.69deg, #1E1851 -9.53%, #4436B7 89.33%)",
                                        }}
                                    >
                                        <h2 className="text-lg font-semibold text-white">تعرف على خيارك</h2>
                                        <p className="mt-1 text-sm text-white">سيتم عرض معلومات التمويل بشكل تقريبي</p>
                                    </div>
                                    <div >
                                        {/* Monthly Salary Field */}

                                        <div className="mt-8 mb-10">
                                            <fieldset>
                                                <label
                                                    htmlFor="salary"
                                                    className=" mr-3 text-sm/6 font-medium text-purple-900 flex items-center justify-center"
                                                >
                                                    الراتب الشهري
                                                </label>
                                                <div className="mt-2 flex justify-center">
                                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 bg-white focus-within:ring-2 focus-within:ring-indigo-600 sm:max-w-md">
                <span className="flex select-none items-center text-gray-500 sm:text-sm mx-4">
                  SAR
                </span>
                                                        <input
                                                            id="salary"
                                                            name="salary"
                                                            type="text"
                                                            value={salary}
                                                            onChange={(e) => setSalary(e.target.value)}
                                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-600 focus:ring-0 sm:text-sm/6"
                                                        />
                                                    </div>
                                                </div>
                                            </fieldset>

                                            {/* Annual Interest Rate Field */}
                                            <fieldset className="mt-5">
                                                <label
                                                    htmlFor="interestRate"
                                                    className="mr-3 text-sm/6 font-medium text-purple-900 flex items-center justify-center"
                                                >
                                                    نسبة الفائدة
                                                </label>
                                                <div className="mt-2 flex justify-center">
                                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 bg-white focus-within:ring-2 focus-within:ring-indigo-600 sm:max-w-md">
                <span className="flex select-none items-center sm:text-sm mx-4">
                  %
                </span>
                                                        <input
                                                            id="interestRate"
                                                            name="interestRate"
                                                            type="text"
                                                            value={interestRate}
                                                            onChange={(e) => setInterestRate(e.target.value)}
                                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-600 focus:ring-0 sm:text-sm/6"
                                                        />
                                                    </div>
                                                </div>
                                            </fieldset>

                                        </div>

                                        <div className="flex items-center justify-center gap-x-6 mb-8 mt-12">
                                            <button
                                                type="submit"
                                                className="rounded-md bg-purple-950 px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                onClick={(e) => {
                                                    handleManualCalculation(e);
                                                    setCurrentStep(3); // Move to Step 3 after calculation
                                                }}
                                            >
                                                عرض النتيجة
                                            </button>
                                            <button
                                                type="button"
                                                className="text-sm/6 font-semibold text-gray-900"
                                                onClick={handleResetCalculation}
                                            >
                                                إعادة الإختيار
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {autoForm && (
                                <div className="overflow-hidden rounded-2xl bg-gray-50 shadow max-w-4xl mx-auto mb-6">
                                    <div
                                        className="px-4 py-5 sm:px-6 text-center"
                                        style={{
                                            background: "linear-gradient(87.69deg, #1E1851 -9.53%, #4436B7 89.33%)",
                                        }}
                                    >
                                        <h2 className="text-lg font-semibold text-white">تعرف على خيارك</h2>
                                        <p className="mt-1 text-sm text-white">سيتم عرض معلومات التمويل بشكل تقريبي</p>
                                    </div>

                                    <div className="mt-8 mb-10">
                                        <fieldset>
                                            <label
                                                htmlFor="interest-rate"
                                                className="mr-3 text-sm/6 font-medium text-purple-900 flex items-center justify-center"
                                            >
                                                المبلغ المطلوب
                                            </label>
                                            <div className="mt-2 flex justify-center">
                                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 bg-white focus-within:ring-2 focus-within:ring-indigo-600 sm:max-w-md">
              <span className="flex select-none items-center text-gray-500 sm:text-sm mx-4">
                SAR
              </span>
                                                    <input
                                                        id="knownLoanAmount"
                                                        name="knownLoanAmount"
                                                        type="text"
                                                        value={knownLoanAmount}
                                                        onChange={(e) => setKnownLoanAmount(e.target.value)}
                                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
                                                    />
                                                </div>
                                            </div>
                                        </fieldset>


                                        {/* Annual Interest Rate Field */}
                                        <fieldset className="mt-5">
                                            <label
                                                htmlFor="interest-rate"
                                                className="mr-3 text-sm/6 font-medium text-purple-900 flex items-center justify-center"
                                            >
                                                نسبة الفائدة
                                            </label>
                                            <div className="mt-2 flex justify-center">
                                                <div
                                                    className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 bg-white focus-within:ring-2 focus-within:ring-indigo-600 sm:max-w-md">
                                            <span
                                                className="flex select-none items-center text-gray-300 sm:text-sm mx-4">
                                                %
                                            </span>
                                                    <input
                                                        id="interestRate"
                                                        name="interestRate"
                                                        type="text"
                                                        value={interestRate}
                                                        onChange={(e) => setInterestRate(e.target.value)}
                                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
                                                    />
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>

                                    {/* Loan Amount Field */}
                                    <div className="flex items-center justify-center gap-x-6  mb-8 mt-10">
                                        <button
                                            type="submit"
                                            className="rounded-md bg-purple-950 px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            onClick={(e) => {
                                                handleAutoCalculation(e);
                                                setCurrentStep(3); // Move to Step 3 after calculation
                                            }}
                                        >
                                            عرض النتيجة
                                        </button>
                                        <button
                                            type="button"
                                            className="text-sm/6 font-semibold text-gray-900"
                                            onClick={handleResetCalculation}
                                        >
                                            إعادة الإختيار
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    {/* Step 3 */}
                            {currentStep === 3 && (
                                <div>
                                     <div className="mx-auto max-w-4xl px-8 py-10 bg-purple-50 rounded-lg mt-8">
                                         <div className="flex items-center justify-center gap-x-6 mt-2"></div>
                                         <TenorsResultTable results={results} exportToExcel={handleExportToExcel} />
                                     </div>
                                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                        <div className="mx-auto max-w-3xl">
                                            <h3 className="text-xl  text-center font-medium text-purple-950 my-14">وذلك وفقا لبيانتك التالية</h3>
                                            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6 place-items-stretch">
                                                <div
                                                    className="overflow-hidden rounded-xl bg-gray-50 shadow w-full h-full mb-6 flex flex-col justify-between"
                                                >
                                                    <div
                                                        className="px-3 py-3 sm:px-6 text-center"
                                                        style={{
                                                            background: 'linear-gradient(87.69deg, #1E1851 -9.53%, #4436B7 89.33%)',
                                                        }}
                                                    >
                                                        <h3 className="font-semibold text-white text-xs sm:text-sm">طريقة الاحتساب</h3>
                                                    </div>
                                                    <div className="flex-grow flex items-center justify-center text-center text-xs sm:text-sm font-medium text-purple-800 px-2 py-1 md:px-4 md:py-2">
                                                        {objective.find((obj) => obj.id === selectedObjective)?.title || 'N/A'}
                                                    </div>
                                                </div>

                                                <div
                                                    className="overflow-hidden rounded-xl bg-gray-50 shadow w-full h-full mb-6 flex flex-col justify-between"
                                                >
                                                    <div
                                                        className="px-3 py-3 sm:px-6 text-center"
                                                        style={{
                                                            background: 'linear-gradient(87.69deg, #1E1851 -9.53%, #4436B7 89.33%)',
                                                        }}
                                                    >
                                                        <h3 className="font-semibold text-white text-xs sm:text-sm">نوع التمويل</h3>
                                                    </div>
                                                    <div className="flex-grow flex items-center justify-center text-center text-xs sm:text-base font-medium text-purple-800 px-2 py-1 md:px-4 md:py-2">
                                                        {loanType.find((loan) => loan.id === selectedLoanType)?.title || 'N/A'}
                                                    </div>
                                                </div>

                                                <div
                                                    className="overflow-hidden rounded-xl bg-gray-50 shadow w-full h-full mb-6 flex flex-col justify-between"
                                                >
                                                    <div
                                                        className="px-3 py-3 sm:px-6 text-center"
                                                        style={{
                                                            background: 'linear-gradient(87.69deg, #1E1851 -9.53%, #4436B7 89.33%)',
                                                        }}
                                                    >
                                                        <h3 className="font-semibold text-white text-xs sm:text-sm ">حالتك الوظيفية</h3>
                                                    </div>
                                                    <div className="flex-grow flex items-center justify-center text-center text-xs sm:text-base font-medium text-purple-800 px-2 py-1 md:px-4 md:py-2">
                                                        {employmentStatus.find((status) => status.id === selectedEmploymentStatus)?.title || 'N/A'}
                                                    </div>
                                                </div>


                                                {manualForm && (
                                                    <>
                                                        <div
                                                            className="overflow-hidden rounded-xl bg-gray-50 shadow w-full h-full mb-6 flex flex-col justify-between"
                                                        >
                                                            <div
                                                                className="px-3 py-3 sm:px-6 text-center"
                                                                style={{
                                                                    background: 'linear-gradient(87.69deg, #1E1851 -9.53%, #4436B7 89.33%)',
                                                                }}
                                                            >
                                                                <h3 className="font-semibold text-white text-xs sm:text-sm">الراتب الشهري</h3>
                                                            </div>
                                                            <div className="flex-grow flex items-center justify-center text-center text-xs sm:text-base font-medium text-purple-800 px-3 py-2 md:px-5 md:py-3">
                                                                {salary ? `${salary} SAR` : 'N/A'}
                                                            </div>
                                                        </div>

                                                        <div
                                                            className="overflow-hidden rounded-xl bg-gray-50 shadow w-full h-full mb-6 flex flex-col justify-between"
                                                        >
                                                            <div
                                                                className="px-3 py-3 sm:px-6 text-center"
                                                                style={{
                                                                    background: 'linear-gradient(87.69deg, #1E1851 -9.53%, #4436B7 89.33%)',
                                                                }}
                                                            >
                                                                <h3 className="font-semibold text-white text-xs sm:text-sm">نسبة الفائدة</h3>
                                                            </div>
                                                            <div className="flex-grow flex items-center justify-center text-center text-xs sm:text-base font-medium text-purple-800 px-3 py-2 md:px-5 md:py-3">
                                                                {interestRate ? `${interestRate}%` : 'N/A'}
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                                {autoForm && (
                                                    <>
                                                        <div
                                                            className="overflow-hidden rounded-xl bg-gray-50 shadow w-full h-full mb-6 flex flex-col justify-between "
                                                        >
                                                            <div
                                                                className="px-3 py-3 sm:px-6 text-center"
                                                                style={{
                                                                    background: 'linear-gradient(87.69deg, #1E1851 -9.53%, #4436B7 89.33%)',
                                                                }}
                                                            >
                                                                <h3 className="font-semibold text-white text-xs sm:text-sm">التمويل المطلوب</h3>
                                                            </div>
                                                            <div className="flex-grow flex items-center justify-center text-center text-xs sm:text-base font-medium text-purple-800 px-3 py-2 md:px-5 md:py-3">
                                                                {knownLoanAmount ? `${knownLoanAmount} SAR` : 'N/A'}
                                                            </div>
                                                        </div>


                                                        <div
                                                            className="overflow-hidden rounded-xl bg-gray-50 shadow w-full h-full mb-6 flex flex-col justify-between"
                                                        >
                                                            <div
                                                                className="px-3 py-3 sm:px-6 text-center"
                                                                style={{
                                                                    background: 'linear-gradient(87.69deg, #1E1851 -9.53%, #4436B7 89.33%)',
                                                                }}
                                                            >
                                                                <h3 className="font-semibold text-white text-xs sm:text-sm">نسبة الفائدة</h3>
                                                            </div>
                                                            <div className="flex-grow flex items-center justify-center text-center text-xs sm:text-base font-medium text-purple-800 px-3 py-2 md:px-5 md:py-3">
                                                                {interestRate ? `${interestRate}%` : 'N/A'}
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-center gap-x-6">
                                            <button
                                                type="button"
                                                className=" mt-10 rounded-md bg-purple-950 px-6 py-2.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                                                onClick={() => {
                                                    setSelectedObjective(null);
                                                    setSelectedLoanType(null);
                                                    setSelectedEmploymentStatus(null);
                                                    setShowManualForm(false);
                                                    setShowAutoForm(false);
                                                    setSalary('');
                                                    setInterestRate('');
                                                    setKnownLoanAmount('');
                                                    setResults([]);
                                                    setIsNextStepDisabled(false);
                                                    setCurrentStep(1); // Go back to Step 1
                                                }}
                                            >
                                                إعادة الإختيار
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                </form>
            </div>
        </div>
    );
}

function ManualCalculation (inputData) {
    const { salary, interestRate, selectedLoanType, selectedEmploymentStatus } = inputData;

    // Determine tenor options based on selectedLoanType
    const tenorOptions =
        selectedLoanType === 'house' ? homeTenor : selectedLoanType === 'personal' ? personalTenor : [];

    if (!tenorOptions.length) {
        throw new Error("Unsupported loan type or employment status");
    }

    // Array to store results for all tenors
    const allTenorResults = [];

    // Loop through each tenor and calculate details
    tenorOptions.forEach((option) => {
        const tenorInYears = parseInt(option.id); // Convert tenor ID to years
        const tenorInMonths = tenorInYears * 12; // Convert tenor to months

        let maxLoan;

        if (selectedLoanType === 'personal' && selectedEmploymentStatus === 'employee') {
            const maxMonthlyInstallment = salary * 0.33;
            maxLoan = (maxMonthlyInstallment * tenorInMonths) / 1.1;
        } else if (selectedLoanType === 'personal' && selectedEmploymentStatus === 'retiree') {
            const maxMonthlyInstallment = salary * 0.25;
            maxLoan = (maxMonthlyInstallment * tenorInMonths) / 1.1;
        } else if (selectedLoanType === 'house') {
            const maxMonthlyInstallment = salary * 0.65;
            maxLoan = (maxMonthlyInstallment * tenorInMonths) / 1.1;
        } else {
            throw new Error("Unsupported loan type or employment status");
        }

        const monthlyInterestRate = interestRate / 12 / 100;

        const mandatory = maxLoan / tenorInMonths;
        const monthlyInterest = (maxLoan * (interestRate / 100)) / tenorInMonths;
        const EMI = (maxLoan * monthlyInterestRate * Math.pow((1 + monthlyInterestRate), tenorInMonths)) /
            (Math.pow((1 + monthlyInterestRate), tenorInMonths) - 1);

        const totalAmountRepaid = EMI * tenorInMonths;
        const totalInterestPaid = totalAmountRepaid - maxLoan;
        const percentageOfInterest = (totalInterestPaid / totalAmountRepaid) * 100;

        // Push calculated result for this tenor into the array
        allTenorResults.push({
            tenor: `${tenorInYears} سنين`,
            maxLoan,
            mandatory,
            monthlyInterest,
            EMI,
            totalInterestPaid,
            totalAmountRepaid,
            percentageOfInterest,
        });
    });

    return allTenorResults; // Return all results
}




function AutoCalculation(inputData) {
    const {
        selectedLoanType,
        knownLoanAmount,
        interestRate,
    } = inputData;

    const tenorOptions =
        selectedLoanType === 'house' ? homeTenor : selectedLoanType === 'personal' ? personalTenor : [];

    if (!tenorOptions.length) {
        throw new Error("Unsupported loan type or employment status");
    }

    // Array to store results for all tenors
    const allTenorResults = [];

    // Loop through each tenor and calculate details
    tenorOptions.forEach((option) => {
        const tenorInYears = parseInt(option.id);
        const tenorInMonths = tenorInYears * 12;

        const monthlyInterestRate = interestRate / 12 / 100;

        const mandatory = knownLoanAmount / tenorInMonths;
        const monthlyInterest = (knownLoanAmount * (interestRate / 100)) / tenorInMonths;
        const EMI = (knownLoanAmount * monthlyInterestRate * Math.pow((1 + monthlyInterestRate), tenorInMonths)) /
            (Math.pow((1 + monthlyInterestRate), tenorInMonths) - 1);

        const totalAmountRepaid = EMI * tenorInMonths;
        const totalInterestPaid = totalAmountRepaid - knownLoanAmount;
        const percentageOfInterest = (totalInterestPaid / totalAmountRepaid) * 100;

        // Push calculated result for this tenor into the array
        allTenorResults.push({
            tenor: `${tenorInYears} سنين`,
            knownLoanAmount,
            mandatory,
            monthlyInterest,
            EMI,
            totalInterestPaid,
            totalAmountRepaid,
            percentageOfInterest,
        });
    });

    return allTenorResults;
}

function TenorsResultTable({ results, exportToExcel }) {
    if (!results || results.length === 0) return <p>No data available</p>;

    return (

            <div className="px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-base font-semibold text-gray-900 text-center mb-4">
                            اطلع على خياراتك لجميع مدد التمويل المتاحة
                        </h1>
                    </div>
                </div>
                <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <div className="overflow-hidden shadow ring-1 ring-black/5 sm:rounded-lg">
                                <table id="result-table" className="min-w-full divide-y divide-gray-300">
                                    <thead className="bg-purple-900">
                                    <tr>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-start text-sm font-normal text-white sm:pl-6">
                                            عدد السنوات
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-start text-sm font-normal text-white">
                                            مبلغ التمويل (SAR)
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-start text-sm font-normal text-white">
                                            القسط الشهري (SAR)
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-start text-sm font-normal text-white">
                                            مبلغ الأرباح (SAR)
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-start text-sm font-normal text-white">
                                            اجمالي المبلغ (SAR)
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-start text-sm font-normal text-white">
                                            نسبة الفائدة (%)
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                    {results.map((result, index) => (
                                        <tr key={index}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                {result.tenor}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {result.maxLoan
                                                    ? result.maxLoan.toFixed(2)
                                                    : (result.knownLoanAmount || 0).toFixed(2)}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {parseFloat(result.EMI).toFixed(2)}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {parseFloat(result.totalInterestPaid).toFixed(2)}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {parseFloat(result.totalAmountRepaid).toFixed(2)}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {parseFloat(result.percentageOfInterest).toFixed(2)}%
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center gap-x-6 mt-6">
                    <button
                        type="button"
                        className="rounded-md bg-purple-950 px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                        onClick={exportToExcel} // Ensure this function is defined and accessible
                    >
                        تحميل xls
                    </button>
                </div>
            </div>
    );
}


export default function NesbahCalculator() {

    return (
        <main className="overflow-hidden">
            <GradientBackground/>
            <Container>
                <Navbar/>
            </Container>
            <Header/>
            <CalculatorForm/>
            <Footer/>
        </main>
    )

}
