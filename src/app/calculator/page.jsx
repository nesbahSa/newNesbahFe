'use client'
import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { Gradient, GradientBackground } from '@/components/gradient'
import { Link } from '@/components/link'
import { LogoCloud } from '@/components/logo-cloud'
import { Navbar } from '@/components/navbar'
import { Heading, Lead, Subheading } from '@/components/text'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
    CheckIcon,
    ChevronUpDownIcon,
    MinusIcon,
} from '@heroicons/react/16/solid'
import React, { useState } from 'react';
import * as XLSX from 'xlsx';



const objective = [
    {id: 'manual', title: 'I would like to see my option'},
    {id: 'auto', title: 'I know how much loan i need'},
]

const employmentStatus = [
    {id: 'employee', title: 'I am an employee'},
    {id: 'retiree', title: 'I am retired'},
]

const loanType = [
    {id: 'personal', title: 'Personal Loan'},
    {id: 'house', title: 'House Loan'},
]

const homeTenor = [
    {id: '5', title: '5 year'},
    {id: '10', title: '10 year'},
    {id: '15', title: '15 year'},
    {id: '20', title: '20 year'},
    {id: '25', title: '25 year'},
    {id: '30', title: '30 year'},
]

const personalTenor = [
    {id: '1', title: '1 year'},
    {id: '2', title: '2 year'},
    {id: '3', title: '3 year'},
    {id: '4', title: '4 year'},
    {id: '5', title: '5 year'},
]

function Header() {
    return (
        <Container className="mt-16">
            <Heading as="h1">Find out your option</Heading>
            <Lead className="mt-6 max-w-3xl">
                With Nesbah calculator you can find out your loan option
            </Lead>
        </Container>
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
    const [manualSpecificTenorResult, setManualSpecificTenorResult] = useState(null);
    const [manualOtherTenorsResults, setManualOtherTenorsResults] = useState([]);
    const [autoSpecificTenorResult, setAutoSpecificTenorResult] = useState(null);
    const [autoOtherTenorsResults, setAutoOtherTenorsResults] = useState([]);
    const [results, setResults] = useState([]);
    const [isNextStepDisabled, setIsNextStepDisabled] = useState(false);

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




    const handleNextStep = (event) => {
        event.preventDefault(); // Prevent form submission

        setSalary('');
        setInterestRate('');
        setKnownLoanAmount('');
        setResults([]);

        if (selectedObjective === 'manual' && selectedLoanType != null && selectedEmploymentStatus != null) {
            setShowManualForm(true); // Proceed to Step 2
        }

        else if (selectedObjective === 'auto' && selectedLoanType != null && selectedEmploymentStatus != null) {
            setShowAutoForm(true);
        }

        else {
            alert('Please fill all the required field.');
        }
    };

    const tenorOptions = selectedLoanType === 'house' ? homeTenor : personalTenor;

    const handleResetCalculation = () => {
        setSalary('');
        setInterestRate('');
        setKnownLoanAmount('');
        setTenor('');
        setIsNextStepDisabled(false)
    };

    const handleManualCalculation = (event) => {
        event.preventDefault();
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
        <div className="flex items-center justify-center min-h-screen bg-white mt-10 pb-16">
            <div className="mx-auto max-w-4xl px-8 py-10 bg-purple-50 shadow-md rounded-lg">
                <form className="flex flex-col items-center space-y-8">
                    <div className="space-y-12 w-full">
                        <div className="pb-4 text-center">
                            <h2 className="text-base/7 font-semibold text-gray-900">
                                Find out about your option
                            </h2>
                            <p className="mt-1 text-sm/6 text-gray-600">
                                This information will be displayed publicly, so be careful what you share.
                            </p>

                            <h1 className="mt-5 font-semibold text-purple-800">STEP 1</h1>

                            {/* Objective Fieldset */}
                            <fieldset className="mt-5">
                                <legend className="text-sm/6 font-semibold text-gray-900">
                                    What is your situation?
                                </legend>
                                <div className="mt-6 flex justify-center items-center">
                                    {objective.map((objective) => (
                                        <div key={objective.id} className="flex items-center">
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
                                                className="mr-2 ml-3 text-sm font-medium text-gray-900"
                                            >
                                                {objective.title}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </fieldset>

                            {/* Loan Type Fieldset */}
                            <fieldset className="mt-10">
                                <legend className="text-sm/6 font-semibold text-gray-900">
                                    What type of loan?
                                </legend>
                                <div className="mt-6 flex justify-center items-center">
                                    {loanType.map((loan) => (
                                        <div key={loan.id} className="flex items-center justify-center">
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
                                                className="mr-2 ml-3 block text-sm font-medium text-gray-900"
                                            >
                                                {loan.title}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </fieldset>

                            {/* Employment Status Fieldset */}
                            <fieldset className="mt-10">
                                <legend className="text-sm/6 font-semibold text-gray-900">
                                    What is your employment status?
                                </legend>
                                <div className="mt-6 flex justify-center items-center">
                                    {employmentStatus.map((employmentStatus) => (
                                        <div key={employmentStatus.id} className="flex items-center justify-center">
                                            <input
                                                id={employmentStatus.id}
                                                name="employmentStatus"
                                                type="radio"
                                                value={employmentStatus.id}
                                                className="size-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 gap-4"
                                                checked={selectedEmploymentStatus === employmentStatus.id}
                                                onChange={() => handleEmploymentStatusChange(employmentStatus.id)}
                                            />
                                            <label
                                                htmlFor={employmentStatus.id}
                                                className="mr-2 ml-3 block text-sm font-medium text-gray-900"
                                            >
                                                {employmentStatus.title}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </fieldset>
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-x-6 mt-2">
                        <button
                            type="button"
                            className="text-sm/6 font-semibold text-gray-900"
                            onClick={handleReset}
                        >
                            Reset Condition
                        </button>
                        <button
                            type="submit"
                            className={`rounded-md px-3 py-2 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
                            ${isNextStepDisabled ? 'bg-gray-400 text-gray-300 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600'}`}
                            onClick={handleNextStep}
                            disabled={isNextStepDisabled}
                        >
                            Next Step
                        </button>
                    </div>

                    {/* Conditional Rendering for Step 2 */}
                    {manualForm && (
                        <>
                            <h1 className="mt-5 font-semibold text-purple-800">STEP 2</h1>

                            {/* Monthly Salary Field */}
                            <fieldset className="mt-5">
                                <label
                                    htmlFor="salary"
                                    className="text-sm/6 font-medium text-gray-900 flex items-center justify-center"
                                >
                                    Monthly salary
                                </label>
                                <div className="mt-2 flex justify-center">
                                    <div
                                        className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 bg-white focus-within:ring-2 focus-within:ring-indigo-600 sm:max-w-md">
                                            <span
                                                className="flex select-none items-center pl-3 text-gray-500 sm:text-sm mr-2 ">
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
                            <fieldset className="mt-10">
                                <label
                                    htmlFor="interestRate"
                                    className="text-sm/6 font-medium text-gray-900 flex items-center justify-center"
                                >
                                    Annual interest rate
                                </label>
                                <div className="mt-2 flex justify-center">
                                    <div
                                        className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 bg-white focus-within:ring-2 focus-within:ring-indigo-600 sm:max-w-md">
                                            <span
                                                className="flex select-none items-center pl-3 600 sm:text-sm mr-2">
                                                %
                                            </span>
                                        <input
                                            id="interestRate"
                                            name="interestRate"
                                            type="text"
                                            value={interestRate}
                                            onChange={(e) => setInterestRate(e.target.value)}
                                            placeholder="3"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:600 focus:ring-0 sm:text-sm/6"
                                        />
                                    </div>
                                </div>
                            </fieldset>

                            <div className="flex items-center justify-center gap-x-6 mt-2">
                                <button
                                    type="button"
                                    className="text-sm/6 font-semibold text-gray-900"
                                    onClick={handleResetCalculation}
                                >
                                    Reset Calculation
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    onClick={handleManualCalculation}
                                >
                                    See result
                                </button>
                            </div>

                            {/* Manual Calculation Tables */}
                            {results.length > 0 && <TenorsResultTable results={results} exportToExcel={handleExportToExcel} />}
                        </>
                    )}

                    {autoForm && (
                        <>
                            <h1 className="mt-5 font-semibold text-purple-800">STEP 2</h1>

                            <fieldset className="mt-10">
                                <label
                                    htmlFor="interest-rate"
                                    className="text-sm/6 font-medium text-gray-900 flex items-center justify-center"
                                >
                                    Loan amount
                                </label>
                                <div className="mt-2 flex justify-center">
                                    <div
                                        className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 bg-white focus-within:ring-2 focus-within:ring-indigo-600 sm:max-w-md">
                                        <span
                                            className="flex select-none items-center pl-3 text-gray-500 sm:text-sm mr-2">
                                                SAR
                                            </span>
                                        <input
                                            id="knownLoanAmount"
                                            name="knownLoanAmount"
                                            type="text"
                                            value={knownLoanAmount}
                                            onChange={(e) => setKnownLoanAmount(e.target.value)}
                                            placeholder="SAR"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
                                        />
                                    </div>
                                </div>
                            </fieldset>

                            {/* Monthly Salary Field */}
                            <fieldset className="mt-5">
                                <label
                                    htmlFor="salary"
                                    className="text-sm/6 font-medium text-gray-900 flex items-center justify-center"
                                >
                                    Monthly salary
                                </label>
                                <div className="mt-2 flex justify-center">
                                    <div
                                        className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 bg-white focus-within:ring-2 focus-within:ring-indigo-600 sm:max-w-md">
                                            <span
                                                className="flex select-none items-center pl-3 text-gray-500 sm:text-sm mr-2">
                                                SAR
                                            </span>
                                        <input
                                            id="salary"
                                            name="salary"
                                            type="text"
                                            onChange={(e) => setSalary(e.target.value)}
                                            placeholder="2000000"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
                                        />
                                    </div>
                                </div>
                            </fieldset>

                            {/* Annual Interest Rate Field */}
                            <fieldset className="mt-10">
                                <label
                                    htmlFor="interest-rate"
                                    className="text-sm/6 font-medium text-gray-900 flex items-center justify-center"
                                >
                                    Annual interest rate
                                </label>
                                <div className="mt-2 flex justify-center">
                                    <div
                                        className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 bg-white focus-within:ring-2 focus-within:ring-indigo-600 sm:max-w-md">
                                            <span
                                                className="flex select-none items-center pl-3 text-gray-500 sm:text-sm mr-2">
                                                %
                                            </span>
                                        <input
                                            id="interestRate"
                                            name="interestRate"
                                            type="text"
                                            onChange={(e) => setInterestRate(e.target.value)}
                                            placeholder="3"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
                                        />
                                    </div>
                                </div>
                            </fieldset>

                            <div className="flex items-center justify-center gap-x-6 mt-2">
                                <button
                                    type="button"
                                    className="text-sm/6 font-semibold text-gray-900"
                                    onClick={handleResetCalculation}
                                >
                                    Reset Calculation
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    onClick={handleAutoCalculation}
                                >
                                    See result
                                </button>
                            </div>

                            {results.length > 0 && <TenorsResultTable results={results} exportToExcel={handleExportToExcel}/>}
                        </>
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
            tenor: `${tenorInYears} years`,
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
            tenor: `${tenorInYears} years`,
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
        <div className="mx-auto max-w-4xl px-8 py-10 bg-purple-50 rounded-lg mt-8">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-base font-semibold text-gray-900 text-center">
                            Your option for all available Tenors
                        </h1>
                        <p className="mt-2 text-sm text-gray-700 text-center">
                            Detailed calculations for all available tenors.
                        </p>
                    </div>
                </div>
                <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <div className="overflow-hidden shadow ring-1 ring-black/5 sm:rounded-lg">
                                <table id="result-table" className="min-w-full divide-y divide-gray-300">
                                    <thead className="bg-purple-900">
                                    <tr>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-normal text-white sm:pl-6">
                                            Tenor
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-normal text-white">
                                            Loan Amount (SAR)
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-normal text-white">
                                            Monthly Installment (SAR)
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-normal text-white">
                                            Total Interest Paid (SAR)
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-normal text-white">
                                            Total Amount Repaid (SAR)
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-normal text-white">
                                            Percentage Of Interest (%)
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
            </div>

            <div className="flex items-center justify-center gap-x-6 mt-6">
                <button
                    type="button"
                    className="rounded-md bg-indigo-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    onClick={exportToExcel} // Ensure this function is defined and accessible
                >
                    Export as .xls
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
