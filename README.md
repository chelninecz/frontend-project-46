### Hexlet tests and linter status

[![Actions Status](https://github.com/chelninecz/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/chelninecz/frontend-project-46/actions)

### Maintainability Badge

[![Maintainability](https://api.codeclimate.com/v1/badges/e020537c4a6594b34ffa/maintainability)](https://codeclimate.com/github/chelninecz/frontend-project-46/maintainability)

### Test Coverage Badge

[![Test Coverage](https://api.codeclimate.com/v1/badges/e020537c4a6594b34ffa/test_coverage)](https://codeclimate.com/github/chelninecz/frontend-project-46/test_coverage)

# Difference Generator

## **Description:**

Gendiff is a utility compares two configuration files and shows a difference.

## **How it works:**

The program defines a difference between structures of two files. Accepted extentions for input are yaml and json. Output formats are plain, JSON and stylish as default. For help type:

```bash
gendiff -h
```

## **System requirements:**

  ***Ubuntu Linux,***
  ***Node.js v18.0.0***

## **Installation:**

1. Clone the project
2. Install dependencies

```bash
 npm ci,
 ```

 or

 ```bash
 make install
 ```

### **Usage:**

```bash
gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -f, --format <type>  output format (default: "stylish")
  -h, --help           display help for command
```

### Usage Demo

## *Simple(not nested):*

[![asciicast](https://asciinema.org/a/f3tf4NiQM4Mk01JAYTMYgDpu0.svg)](https://asciinema.org/a/f3tf4NiQM4Mk01JAYTMYgDpu0)

## *Stylish:*

 [![asciicast](https://asciinema.org/a/ZVxdpEahSyEMJW3gFAULShKR0.svg)](https://asciinema.org/a/ZVxdpEahSyEMJW3gFAULShKR0)

## *Plain:*

 [![asciicast](https://asciinema.org/a/OnqouE9JA4SzGjLdtk5yo7ygc.svg)](https://asciinema.org/a/OnqouE9JA4SzGjLdtk5yo7ygc)

## *JSON:*

 [![asciicast](https://asciinema.org/a/P98UCoZtwySY4eqjRLbv8TTf3.svg)](https://asciinema.org/a/P98UCoZtwySY4eqjRLbv8TTf3)
