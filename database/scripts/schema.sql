PRAGMA foreign_keys = ON;

create table if not exists main.ref_state (
    Id integer primary key,
    DisplayName text not null
);

create table if not exists main.ref_super_choice (
    Id integer primary key,
    DisplayName text not null
);

create table if not exists main.ref_residency_status (
    Id integer primary key,
    DisplayName text not null
);

create table if not exists main.ref_employment_type (
    Id integer primary key,
    DisplayName text not null
);

insert into ref_state
values
    (0, "ACT"),
    (1, "NSW"),
    (2, "NT"),
    (3, "QLD"),
    (4, "SA"),
    (5, "TAS"),
    (6, "VIC"),
    (7, "WA")
;

insert into ref_super_choice
values
    (0, "APRA fund or retirement savings account (RSA)"),
    (1, "Self-managed super fund (SMSF)"),
    (2, "Super fund nominated by my employer")
;

insert into ref_residency_status
values
    (0, "Australian resident"),
    (1, "Foreign resident"),
    (2, "Working holiday maker")
;

insert into ref_employment_type
values
    (0, "Full-time employment"),
    (1, "Part-time employment"),
    (2, "Casual employment"),
    (3, "Labour hire"),
    (4, "Superannuation or annuity income stream")
;

create table if not exists main.person (
    Id integer primary key,
    FirstName text not null,
    LastName text not null,
    Email text not null,
    Phone text not null,

    AddressLine text not null,
    AddressSuburb text not null,
    AddressState integer not null ,
    AddressPostalCode text not null,

    EmergencyContactName text not null,
    EmeregncyContactPhone text not null,
    EmergencyContactRelationship text not null,

    BankAccountName text not null,
    BankAccountNumber text not null,
    BankBSB text not null,

    SuperChoice integer null,
    StapledSuper integer not null,
    APRAUSI text null,
    APRAMemberNumber text null,
    SMSFName text null,
    SMSFABN text null,
    SMSFAccountName text null,
    SMSFAccountNumber text null,
    SMSFBSB text null,
    SMSFElectronicServiceAddress text null,
    SuperConfirmed integer not null,

    TFN text not null,
    DateOfBirth text not null,
    EmployeePaidBasis integer not null,
    IsAusResidentForTaxPurposes integer not null,
    TaxFreeThresholdClaimed integer not null,
    SeniorsPensioners integer not null,
    TaxZoneOverseasInvalidCarer integer not null,
    HasHelpDebt integer not null,
    HasSupplementDebt integer not null,
    TaxConfirmed integer not null,

    ResidencyStatus integer not null,
    Convicted integer not null,
    ConvictionComment text null,

    foreign key(AddressState) references ref_state(Id)
    foreign key(SuperChoice) references ref_super_choice(Id)
    foreign key(EmployeePaidBasis) references ref_employment_type(Id),
    foreign key(ResidencyStatus) references ref_residency_status(Id)
);

create table if not exists main.access_token (
    token integer primary key,
    person integer not null,
    date_created date not null default CURRENT_TIMESTAMP
);