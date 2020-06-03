/*
Given an Operating System like Unix, a user can search files based on some condition like a file name, file extension
Design the classes and interfaces to return the results of a search

Example:
Find all File > 5 Mb
Find all XML files
*/

class FileName {
  String name; // File name
  int size; // File size
  int type; // File size
  boolean isDirectory; // Is this is a directory or not
  File [] children; // Children
}

// Abstract class should have at least one abstract method without a body
// It can have multiple concrete methods.
// Inhereting the class should implement the abstract method

/*
Important Reasons For Using Interfaces:
- Interfaces are used to achieve abstraction.
- Designed to support dynamic method resolution at run time
- It helps you to achieve loose coupling.
- Allows you to separate the definition of a method from the inheritance hierarchy

Important Reasons For Using Abstract Class:
- Abstract classes offer default functionality for the subclasses.
- Provides a template for future specific classes
- Helps you to define a common interface for its subclasses
- Abstract class allows code reusability.
*/
interface Filter {
  public boolean apply(Filter file);
}

class MinSizeFilter extends Filter {
  int minSize;

  public MinSizeFilter(int minSize) {
    this.minSize = minSize;
  }

  @override
  public boolean apply(File file) {
    return file.size > minSize;
  }
}

class TypeFilter extends Filter {
  int type;

  public TypeFilter(int type) {
    this.type = type;
  }

  @override
  public boolean apply(Filter file) {
    return file.type == type;
  }
}

class FindCommand {
  public List<File> findFilesWithFilter(File directory, List<Filter> filters) {
    if(!directory.isDirectory) {
      return new NotADirectoryException();
    }
    List<File> output = new ArratList<>();
    findWithFilters(directory, filters, output);
    return output;
  }

  private void findWithFilters(File directory, List<Filter> filters, List<File>output) {
    if(directory.children == null) {
      return;
    }
    for(File file : directory.children) {
      if(file.isDirectory) {
        findWithFilters(file, filters, output);
      } else {
        boolean selectFile = true;
        for(Filter filter: filters) {
          if(!filter.apply(file)) {
            selectFile = false;
          }
        }
        // Apply filters
        if(selectFile) {
          output.add(file);
        }
      }
    }
  }
}