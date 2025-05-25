"""
This is a helper file to list the main steps
that need to be finished for the operator implementation.
"""
import csv
import sys
import json

class OnePassOperator:
    def _init_(self, config):
        self.memory = 0
        self._loadConfig(config)

def _loadConfig(configFile):
    f = open(configFile)
    data = json.load(f)
    memorySize, blockSize = data["memory_size"], data["block_size"]
    return memorySize, blockSize


def _loadColNames(inputFile):
    with open(inputFile) as csvFile:
        firstRow = csvFile.readline().strip()
        colNames = firstRow.split(",")
        return colNames
    return []

# TODO: Return the number of data rows in the table.
#       You are only allowed to use one tuple in memory for this method.
#       (do not load entire table in memory to calculate the size)
def _loadTableSize(tableFile):
    numRows = 0
    with open(tableFile) as f:
        for i in enumerate(f):
            numRows += 1
    return numRows-1


def onePassOperator(configFile, table1File, table2File, outputFile):
    outputFileCursor = open(outputFile, 'w')
    csvWriter = csv.writer(outputFileCursor)
    # TODO: step 1 - load config.txt as json, 
    #                extract memory size (Number of blocks in the main memory) 
    #                and block size(Number of Tuples in a block).
    #                Compute maximal number of rows(tuples) that 
    #                can be loaded into memory.
    memorySize, blockSize = _loadConfig(configFile)
    maxNumOfTuples = memorySize * blockSize
    
    size1, size2 = _loadTableSize(table1File), _loadTableSize(table2File)
    
    # TODO: step 2.1 - check if there is enough memory available to carry out the union operation
    failingConditions = min(size1, size2) > maxNumOfTuples
    if failingConditions:
        outputFileCursor.write("INVALID MEMORY\n")
        outputFileCursor.close()
        return

    colNames1 = _loadColNames(table1File)
    colNames2 = _loadColNames(table2File)
    #TODO: step 2.2 - check if the column names of input table 1 and input table 2 are valid
    failingConditions = colNames1 != colNames2
    if failingConditions:
        outputFileCursor.write("INVALID SCHEMA/INPUT\n")
        outputFileCursor.close()
        return
    
    # TODO step 2.3 - flush one colNames dict as they are the same
    colNames = colNames1
    memory = [] 
    # TODO: step 3 - load smaller data table into memory
    with open(table1File) as csvFile:
        csvReader = csv.reader(csvFile, delimiter=",")
        for i, row in enumerate(csvReader):
            if i == 0:
                continue
            memory.append(row)

    
    # TODO: step 4 - write column names to the outputFile
    csvWriter.writerow(colNames)

    
    # TODO: step 4.1 - flush the other colNames as well as its no longer needed
    colNames = None
    colNames1 = None
    colNames2 = None
    
    # TODO: step 5 - Write all rows from the smaller table (now in memory)
    for row in memory:
        csvWriter.writerow(row)


    # TODO: step 6 - load larger data table into the memory row by row and append unique rows to the output file
    with open(table2File) as csvFile:
        csvReader = csv.reader(csvFile, delimiter=",")
        for i, row in enumerate(csvReader):
            if i == 0:
                continue
            if row not in memory:
                csvWriter.writerow(row)
    
    outputFileCursor.close()

if _name_ == "_main_":
    configFile, table1File, table2File, outputFile = sys.argv[1:]
    onePassOperator(configFile, table1File, table2File, outputFile)