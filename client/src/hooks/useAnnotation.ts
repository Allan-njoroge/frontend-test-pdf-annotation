import { useState } from 'react';
import { AnnotationType } from '@/utils/types';

export const useAnnotations = () => {
  const [annotations, setAnnotations] = useState<AnnotationType[]>([]);

  const addAnnotation = (annotation: Omit<AnnotationType, 'id'>) => {
    setAnnotations(prev => [
      ...prev,
      { ...annotation, id: Date.now().toString() }
    ]);
  };

  const removeAnnotation = (id: string) => {
    setAnnotations(prev => prev.filter(ann => ann.id !== id));
  };

  const clearPageAnnotations = (pageNumber: number) => {
    setAnnotations(prev => prev.filter(ann => ann.page !== pageNumber));
  };

  return { annotations, addAnnotation, removeAnnotation, clearPageAnnotations };
};